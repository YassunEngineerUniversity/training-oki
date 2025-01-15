class Api::TicketsController < ApplicationController
  before_action :authenticate_user! # セッションを保持しているかアクションの前に確認

  def mine
    @tickets = current_user.tickets

    if @tickets.empty?
      render json: { error: "チケットが存在しないです。" }, status: :not_found
      return
    end

    @filter_params = params[:filter]

    if @filter_params && @filter_params == "receive"
      current_user_receive_transfers = current_user.received_transfers.where(status: "sending")
      receive_ticket_ids = current_user_receive_transfers.pluck(:ticket_id)
      @receive_tickets = Ticket.where(id: receive_ticket_ids)
    end

    render :mine
  end

  def used
    ticket_params = params[:id]

    ticket = current_user.tickets.find_by(id: ticket_params)

    # チケットが見つからない場合
    unless ticket
      render json: { error: "チケットが存在しないです。" }, status: :not_found
      return
    end

    # すでに消し込み済みであるかのチェック（nilではないか or 空ではないか）
    if ticket.used_time.present?
      render json: { error: "すでに消し込み済みのチケットです。" }, status: :unprocessable_entity
      return
    end

    # 消し込み処理
    if ticket.update(used_time: Time.zone.now)
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
    return render_error("すでに移行済みのチケットです。", :bad_request) if already_transferred?(transfer_ticket)

    transfer = Transfer.new (
      from_user_id: current_user.id,
      to_user_id: to_user.id,
      ticket_view_id: transfer_ticket.ticket_view_id,
      ticket_id: transfer_ticket.id,
      status: "sending"
    )

    if transfer.save
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

      # 移行元のユーザが存在しない場合
      if from_user.nil?
        render json: { error: "移行元ユーザが存在しません。" }, status: :bad_request
        return
      end

      # 移行元のユーザと移行先のユーザが同じ場合
      if receive_user.id == from_user.id
        render json: { error: "移行元と移行先が同じです。" }, status: :bad_request
        return
      end

      if receive_user_transfer.nil?
        render json: { error: "移行情報がありません" }, status: :not_found
        return
      end
      
      # 移行するチケットの取得
      transfer_ticket = from_user.tickets.find_by(id: receive_user_transfer.ticket_id)
      before_transfer_ticket_id = transfer_ticket.ticket_view_id

      # 移行するチケットが存在しない場合
      if transfer_ticket.nil?
        render json: { error: "移行するチケットが存在しないです。" }, status: :bad_request
        return
      end

      # すでに移行済みの場合
      if receive_user.received_transfers.find_by(ticket_id: transfer_ticket.id, status: "completed")
        render json: { error: "すでに受け取り済みのチケットです。" }, status: :bad_request
        return
      end

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

      if from_user_ticket_view && from_user_ticket_view.tickets.empty?
        from_user_ticket_view.destroy
      end
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

  def render_error(message, status)
    render json: { error: message }, status: status
  end

  def already_transferred?(ticket)
    ticket.transfer_time.present? || ticket.ticket_view.transfers.where(status: ["sending", "completed"]).exists?
  end
end
