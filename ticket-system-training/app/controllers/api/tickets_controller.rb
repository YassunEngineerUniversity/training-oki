class Api::TicketsController < ApplicationController
  def used
    used_params = params[:used]
    ticket_params = params[:id]

    # パラメータがnil or falseでないかチェック
    unless used_params || ticket_params
      render json: { error: "パラメータが不足しています。もしくは、パラメータが誤っています。" }, status: :bad_request
    end

    ticket = Ticket.find_by(id: ticket_params)
    current_time = Time.current

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
    if ticket.update(used_time: current_time)
      render :used
    else
      render json: { error: "消し込み処理中にエラーが発生しました。" }, status: :unprocessable_entity
    end
  end

  def transfer
    transfer_from_user_params = params[:from_user]
    transfer_to_user_params = params[:to_user]
    ticket_params = params[:id]

    # パラメータがnil or falseでないかチェック
    unless transfer_from_user_params || transfer_to_user_params || ticket_params
      render json: { error: "パラメータが不足しています。もしくは、パラメータが誤っています。" }, status: :bad_request
    end

    from_user = User.find_by(id: transfer_from_user_params[:id])
    to_user = User.find_by(id: transfer_to_user_params[:id])
    tickets = Ticket.includes(:ticket_view)
    transfer_ticket = tickets.find_by(id: ticket_params)
    transfer = Transfer.find_by(from_user_id: from_user.id, to_user_id: to_user.id, ticket_view_id: transfer_ticket.ticket_view_id)

    # 移行元、移行先、移行するチケットが見つからない場合
    unless from_user || to_user || transfer_ticket 
      render json: { error: "指定されたリソースが見つかりません。" }, status: :not_found
      return
    end

    # すでに移行済みのチケットの場合
    if transfer.present?
      render json: { error: "すでに移行済みのチケットです。" }, status: :bad_request
      return
    end

    # 移行するチケットと同じ公演が移行先のチケットビューにあるかどうかチェック
    to_user_ticket_view = TicketView.find_by(user_id: to_user.id, event_id: transfer_ticket.ticket_view.event_id)

    # 移行先がチケットビューを持たない場合に新規作成
    unless to_user_ticket_view
      to_user_ticket_view = TicketView.create(user_id: to_user.id, event_id: transfer_ticket.ticket_view.event_id)
    end

     # チケットの移行時間の書き込みとチケットビューの更新
    transfer_ticket.update(transfer_time: Time.current, ticket_view_id: to_user_ticket_view.id)

    # 移行元が移行したチケットと同じチケットビューを持っているかどうかチェック
    from_user_ticket = tickets.where(ticket_view_id: transfer_ticket.ticket_view.id).where.not(id: transfer_ticket.id)

    if from_user_ticket.empty?
      from_user_ticket_view = TicketView.find_by(user_id: from_user.id, event_id: transfer_ticket.ticket_view.event_id)
      from_user_ticket_view.destroy if from_user_ticket_view.present?
    end

    # 移行情報をTransferテーブルに追加
    Transfer.create(
      from_user_id: from_user.id,
      to_user_id: to_user.id,
      ticket_view_id: to_user_ticket_view.id
    )

    render :transfer
  end
end
