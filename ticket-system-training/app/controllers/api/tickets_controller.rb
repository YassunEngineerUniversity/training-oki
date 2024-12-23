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
end
