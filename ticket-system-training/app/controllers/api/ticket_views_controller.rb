class Api::TicketViewsController < ApplicationController
  include Authentication
  # create アクションだけで外部APIの認証を実行
  before_action :authenticate_play_guide, only: [:create]

  # その他は内部APIでログインしていないとエンドポイントにアクセスできない
  before_action :authenticate_user!, only: [:show, :mine, :index]

  def index
    # パラメータの取得
    play_guide_ids = params[:play_guide_ids] || [] #プレイガイドID（複数可）
    show_id = params[:show_id] #興行ID
    event_ids = params[:event_ids] || [] #公演ID（複数可）
    from_date = params[:from_date] #公演の日時
    to_date = params[:to_date] #公演の日時
    used_flag = params[:used] #消し込み

    # eventテーブルとshowテーブルをINNER JOINさせ、N+1を対策ため、includesで最小限のクエリにする
    @ticket_views = TicketView.joins(tickets: :play_guide, event: :show).includes(tickets: { play_guide: {} }, event: { show: {} })

    # 興行IDでフィルタリング
    @ticket_views = @ticket_views.where(shows: { id: show_id }) if show_id.present?

    # プレイガイドID（複数）でフィルタリング
    @ticket_views = @ticket_views.where(tickets: { play_guide_id: play_guide_ids }) if play_guide_ids.present?

    # 公演ID（複数）でフィルタリング
    @ticket_views = @ticket_views.where(events: { id: event_ids }) if event_ids.present?

    # 公演日時でフィルタリング
    if from_date.present? && to_date.present?
      @ticket_views = @ticket_views.where(events: { date: from_date..to_date })
    end

    # 消し込み済みフラグでフィルタリング
    if used_flag.present?
      @ticket_views = @ticket_views.where.not(tickets: {used_time: nil}) if used_flag == "true"
      @ticket_views = @ticket_views.where(tickets: {used_time: nil}) if used_flag == "false"
    end

      # データ存在確認
    if @ticket_views.exists?
      render :index
    else
      render json: { message: "チケットビューが存在しないです。" }, status: :not_found
    end
  end

  def show
    ticket_view_params = params[:id]
    @filter_params = params[:filter]

    case @filter_params
    when "receive"
      @ticket_view = TicketView.includes(:tickets, :transfers).find_by(id: ticket_view_params)
      @filtered_tickets = filter_receive_tickets(@ticket_view)
    when "sending"
      @ticket_view = current_user.ticket_views.includes(:tickets, :transfers).find_by(id: ticket_view_params)
      @filtered_tickets = filter_sending_tickets(@ticket_view)
    else
      @ticket_view = current_user.ticket_views.includes(:tickets, :transfers).find_by(id: ticket_view_params)
      @filtered_tickets = filter_tickets(@ticket_view)
    end

    if @ticket_view.nil?
      render json: { error: "チケットビューが存在しないです。" }, status: :not_found
    else
      render :show
    end
  end

  # ログインしているユーザのチケットビュー一覧
  def mine
    @filter_params = params[:filter]

    case @filter_params
    when "receive"
      load_receive_ticket_views
    when "sending"
      load_ticket_views_with_sending
    else
      load_ticket_views_without_sending
    end

    if @ticket_views.nil? || @ticket_views.empty?
      render json: { error: "チケットビューが存在しないです。" }, status: :not_found
    else
      render :mine
    end
  end

  def create
    # パラメータの取得
    user_params = params.require(:user).permit(:name, :email)
    event_params = params.require(:event).permit(:id)
    tickets_params = params.require(:tickets).map do |ticket|
      ticket.permit(:type_name, :price, :entrance_name, :seat_area, :seat_number, benefits: [:name, :details])
    end

    # トランザクションを作成
    ActiveRecord::Base.transaction do

      # ユーザの作成または取得
      user = User.find_or_create_by!(email: user_params[:email]) do | u |
        u.name = user_params[:name]
        u.password = SecureRandom.hex(8) # 仮パスワード
      end

      # 公演の取得
      event = Event.find_by!(id:event_params[:id])

      # チケットビューの作成または取得
      @ticket_view = TicketView.find_or_create_by!(user: user, event: event)

      # チケットと特典の作成
      tickets_params.each do |ticket_params|
        # 券種の作成または取得
        @ticket_type = TicketType.find_or_create_by!(
          name: ticket_params[:type_name], 
          price: ticket_params[:price], 
          event: event,
        )
        # 入場口の作成または取得
        @entrance = Entrance.find_or_create_by!(name: ticket_params[:entrance_name])

        # チケットの作成
        ticket = Ticket.create!(
          ticket_view: @ticket_view,
          ticket_type: @ticket_type,
          entrance: @entrance,
          play_guide: @current_play_guide
        )

        # 座席の作成
        @seat = Seat.create!(
          seat_area: ticket_params[:seat_area],
          seat_number: ticket_params[:seat_number],
          ticket: ticket
        )

        benefits_params = ticket_params[:benefits] || []
        # 特典の作成
        benefits_params.each do |benefit_params|
          @benefit = Benefit.create!(
            ticket: ticket,
            name: benefit_params[:name],
            details: benefit_params[:details]
          )
        end
      end
    end

    render :create

    rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: "Record not found: #{e.message}" }, status: :not_found
    rescue ActionController::ParameterMissing => e
      render json: { error: "Missing parameter: #{e.message}" }, status: :bad_request
    rescue StandardError => e
      render json: { error: "Unexpected error occurred: #{e.message}" }, status: :internal_server_error
  end

  private
    # ログインユーザが受け取り可能なチケットビューをロード
    def load_receive_ticket_views
      current_user_received_transfers = current_user.received_transfers.includes(:ticket_view).where(status: "sending")

      @ticket_views = current_user_received_transfers.map do |transfer|
        { ticket_view: transfer.ticket_view, tickets: transfer.ticket_view.tickets }
      end
    end

    # 譲渡中のチケットビューをロード
    def load_ticket_views_with_sending
      @ticket_views = filter_ticket_views(current_user.ticket_views) do |ticket_view, ticket|
        ticket_view.transfers.find_by(ticket_id: ticket.id, status: "sending")
      end
    end

    # 譲渡中でないチケットビューをロード
    def load_ticket_views_without_sending
      @ticket_views = filter_ticket_views(current_user.ticket_views) do |ticket_view, ticket|
        ticket_view.transfers.find_by(ticket_id: ticket.id, status: "sending").nil?
      end
    end

    # 共通のフィルタリングロジック
    def filter_ticket_views(ticket_views)
      ticket_views.includes(:tickets, :transfers).map do |ticket_view|
        filtered_tickets = ticket_view.tickets.select do |ticket|
          yield(ticket_view, ticket) # 条件ブロックを実行
        end
    
        if filtered_tickets.any?
          { ticket_view: ticket_view, tickets: filtered_tickets }
        end
      end.compact
    end

    def filter_tickets(ticket_view)
      ticket_view.tickets.map do |ticket|
        transfer = ticket.transfer
        to_user = transfer ? transfer.to_user : nil
        from_user = transfer ? transfer.from_user : nil
        {ticket: ticket, to_user: to_user, from_user: from_user, transfer: transfer}
      end
    end

    def filter_sending_tickets(ticket_view)
      ticket_view.tickets.map do |ticket|
        transfer = ticket.transfer&.status == "sending" ? ticket.transfer : nil
        to_user = transfer ? transfer.to_user : nil
        from_user = transfer ? transfer.from_user : nil
        
        next if transfer.nil?

        {ticket: ticket, to_user: to_user, from_user: from_user, transfer: transfer}
      end.compact
    end

    def filter_receive_tickets(ticket_view)
      @ticket_view.tickets.map do |ticket|
        transfer = ticket.transfer&.status == "sending" && ticket.transfer.to_user_id == current_user.id ? ticket.transfer : nil
        to_user = transfer ? transfer.to_user : nil
        from_user = transfer ? transfer.from_user : nil
        next if transfer.nil?

        {ticket: ticket, to_user: transfer.to_user, from_user: transfer.from_user, transfer: transfer}
      end.compact
    end
end
