class Api::TicketsController < ApplicationController
  before_action :authenticate_user! # セッションを保持しているかアクションの前に確認

  def used
    ticket_params = params[:id]
    ticket = current_user.tickets.find_by(id: ticket_params)

    return render_error("チケットが見つかりません", :not_found) if ticket.nil?
    if ticket_already_used?(ticket)
      return render_error("すでに消し込み済みのチケットです。", :unprocessable_entity)
    end

    # 消し込み処理
    if update_ticket_used(ticket)
      render :used
    else
      render json: { error: "消し込み処理中にエラーが発生しました。" }, status: :unprocessable_entity
    end
  end

  def transfer_send
    transfer_to_user_params = params.require(:to_user).permit(:id, :name)
    ticket_params = params[:id]

    to_user = User.find_by(id: transfer_to_user_params[:id])
    transfer_ticket = current_user.tickets.find_by(id: ticket_params)

    # エラーチェック
    return render_error("移行先ユーザーが見つかりません。", :not_found) if to_user.nil?
    return render_error("移行先ユーザーと移行元ユーザーが同じです。", :bad_request) if current_user.id == to_user.id
    return render_error("移行するチケットが見つかりません。", :not_found) if transfer_ticket.nil?
    return render_error("期限切れのチケットです。", :bad_request) if transfer_ticket.ticket_view.event.date < Time.zone.now
    return render_error("すでに移行済みのチケットです。", :bad_request) if ticket_already_transferred?(transfer_ticket)

    transfer = Transfer.create(
      from_user_id: current_user.id,
      to_user_id: to_user.id,
      ticket_view_id: transfer_ticket.ticket_view_id,
      ticket_id: transfer_ticket.id,
      status: "sending"
    )

    if transfer.persisted?
      render :send
    else
      render_error("Transferを作成中にエラーが発生しました", :unprocessable_entity)
    end
  end

  def transfer_receive
    ticket_params = params[:id]

    # トランザクションを作成
    ActiveRecord::Base.transaction do
      receive_user = current_user
      receive_user_transfer = receive_user.received_transfers.find_by(to_user_id: receive_user.id, ticket_id: ticket_params)
      from_user = User.find_by(id: receive_user_transfer.from_user_id)

      # エラーチェック
      return render_error("移行先ユーザーが見つかりません。", :not_found) if from_user.nil?
      return render_error("移行先ユーザーと移行元ユーザーが同じです。", :bad_request) if receive_user.id == from_user.id
      return render_error("移行情報がありません。", :not_found) if receive_user_transfer.nil?
      
      # 移行するチケットの取得
      transfer_ticket = from_user.tickets.find_by(id: receive_user_transfer.ticket_id)
      before_transfer_ticket_id = transfer_ticket.ticket_view_id

      # 移行するチケットが存在しない場合
      return render_error("移行するチケットが見つかりません。", :not_found) if transfer_ticket.nil?

      # すでに移行済みの場合
      return render_error("すでに受け取り済みのチケットです。", :bad_request) if ticket_already_received?(transfer_ticket)

      # 移行先がすでにticket_viewを持っているか確認
      receive_user_ticket_view = receive_user.ticket_views.find_by(user_id: receive_user.id, event_id: transfer_ticket.ticket_view.event_id)
  
      # 移行先がチケットビューを持たない場合に新規作成
      if receive_user_ticket_view.nil?
        receive_user_ticket_view = TicketView.create!(user_id: receive_user.id, event_id: transfer_ticket.ticket_view.event_id)
      end

       # チケットの移行時間の書き込みとチケットビューの更新
      transfer_ticket.update!(transfer_time: Time.zone.now, ticket_view_id: receive_user_ticket_view.id)

      # DBから最新の状態を取得
      transfer_ticket.reload

      # 移行ステータスをsendingからcompleted、チケットビューを変更
      receive_user_transfer.update!(ticket_view_id:transfer_ticket.ticket_view_id, status: "completed")
  
      # 移行元ユーザーのチケットビューが存在しており、紐づいているチケットが存在しない場合
      from_user_ticket_view = from_user.ticket_views.find_by(id: before_transfer_ticket_id)
      destroy_empty_ticket_view(from_user_ticket_view)
     end

    render :receive

    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: "Record not found: #{e.message}" }, status: :not_found
    rescue ActionController::ParameterMissing => e
      render json: { error: "Missing parameter: #{e.message}" }, status: :bad_request
    rescue StandardError => e
      render json: { error: "Unexpected error occurred: #{e.message}" }, status: :internal_server_error
  end

  def ticket_already_transferred?(ticket)
    ticket.transfer_time.present? || ticket.ticket_view.transfers.where(status: ["sending", "completed"]).exists?
  end

  def ticket_already_received?(ticket)
    current_user.received_transfers.find_by(ticket_id: ticket.id, status: "completed")
  end

  def ticket_already_used?(ticket)
    ticket.used_time.present?
  end

  def update_ticket_used(ticket)
    ticket.update(used_time: Time.zone.now)
  end

  def destroy_empty_ticket_view(ticket_view)
    if ticket_view && ticket_view.tickets.empty?
      ticket_view.destroy
    end
  end

  def render_error(message, status)
    render json: { error: message }, status: status
  end
end
