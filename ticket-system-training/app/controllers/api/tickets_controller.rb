class Api::TicketsController < ApplicationController
  before_action :authenticate_user! # セッションを保持しているかアクションの前に確認

  def used
    ticket_params = params[:id]

    ticket = current.tickets.find_by(id: ticket_params)

    # チケットが見つからない場合
    unless ticket
      render json: { error: "チケットが存在しないです。" }, status: :not_found
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

    # 移行先、移行するチケットが見つからない場合
    unless to_user || transfer_ticket
      render json: { error: "指定されたリソースが見つかりません。" }, status: :not_found
      return
    end

    # すでに移行済みのチケットの場合
    if transfer_ticket.transfer_time.present?
      render json: { error: "すでに移行済みのチケットです。" }, status: :bad_request
      return
    end

    if current_user.sent_transfers.exists?(to_user_id: to_user.id, ticket_view_id: transfer_ticket.ticket_view_id, ticket_id: transfer_ticket.id)
      render json: { error: "すでにTransferが作成されています" }, status: :bad_request
      return
    end

    transfer = Transfer.create(
      from_user_id: current_user.id,
      to_user_id: to_user.id,
      ticket_view_id: transfer_ticket.ticket_view_id,
      ticket_id: transfer_ticket.id,
      status: "sending"
    )

    if transfer
      render :send
    else
      render json: { error: "Transferを作成中にエラーが発生しました。" }, status: :unprocessable_entity
    end
  end

  def transfer_receive
    ticket_params = params[:id]

    # トランザクションを作成
    ActiveRecord::Base.transaction do
      receive_user = current_user
      receive_user_transfer = receive_user.received_transfers.find_by(to_user_id: receive_user.id, ticket_id: ticket_params)
      from_user = User.find_by(id: receive_user_transfer.from_user_id)

      unless from_user
        render json: { error: "移行元ユーザが存在しません。" }, status: :bad_request
        return
      end

      if receive_user == from_user
        render json: { error: "移行元と移行先が同じです。" }, status: :bad_request
        return
      end
      
      transfer_ticket = from_user.tickets.find_by(id: receive_user_transfer.ticket_id)
      
      # 移行先がすでにticket_viewを持っているか確認
      receive_user_ticket_view = receive_user.ticket_views.find_by(user_id: receive_user.id, event_id: transfer_ticket.ticket_view.event_id)
  
      # 移行先がチケットビューを持たない場合に新規作成
      unless receive_user_ticket_view
        receive_user_ticket_view = TicketView.create!(user_id: receive_user.id, event_id: transfer_ticket.ticket_view.event_id)
      end

      # チケットの移行時間の書き込みとチケットビューの更新
      transfer_ticket.update!(transfer_time: Time.zone.now, ticket_view_id: receive_user_ticket_view.id)
  
      # 移行元が移行したチケットと同じチケットビューを持っているかどうかチェック（移行したチケットは除く）
      from_user_ticket = from_user.tickets.where(ticket_view_id: transfer_ticket.ticket_view.id).where.not(id: transfer_ticket.id)
  
      if from_user_ticket.empty?
        from_user_ticket_view = from_user.ticket_views.find_by(user_id: from_user.id, event_id: transfer_ticket.ticket_view.event_id)
        from_user_ticket_view.destroy if from_user_ticket_view.present?
      end
  
      # 移行ステータスをsendingからcompletedに変更
      receive_user_transfer.update!(status: "completed")
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
end
