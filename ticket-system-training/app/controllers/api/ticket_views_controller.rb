class Api::TicketViewsController < ApplicationController
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

    def create
      play_guide = PlayGuide.find_by(name: "プレイガイドC")

      # トランザクションを作成
      ActiveRecord::Base.transaction do
        # ユーザ情報の処理
        user_params = params[:user]
        user = User.find_or_create_by!(email: user_params[:email]) do | u |
          u.name = user_params[:name]
          u.password = SecureRandom.hex(8) # 仮パスワード
        end

        # 興行主の作成または取得
        organizer_params = params[:organizer]
        organizer = Organizer.find_or_create_by!(name: organizer_params[:name])

        # 興行の作成または取得
        show_params = params[:show]
        show = Show.find_or_create_by!(name: show_params[:name], organizer: organizer) do | s |
          s.start_datetime = show_params[:start_datetime]
          s.end_datetime = show_params[:end_datetime]
          s.details = show_params[:details]
        end

        # 公演の作成または取得
        event_params = params[:event]
        event = Event.find_or_create_by!(name: event_params[:name], show: show) do |e|
          e.details = event_params[:details]
          e.date = event_params[:date]
          e.venue = event_params[:venue]
          e.open_time = event_params[:open_time]
          e.start_time = event_params[:start_time]
          e.end_time = event_params[:end_time]
          e.notes = event_params[:notes]
        end

        # チケットビューの作成
        ticket_view = TicketView.find_or_create_by!(user: user, event: event)

        # チケットと特典の作成
        tickets = params[:tickets]
        tickets.each do |ticket_params|
          # 券種の作成または取得
          ticket_type = TicketType.find_or_create_by!(name: ticket_params[:type_name], price: ticket_params[:price], event: event)
          # 入場口の作成または取得
          entrance = Entrance.find_or_create_by!(name: ticket_params[:entrance_name])

          # チケットの作成
          ticket = Ticket.create!(
            ticket_view: ticket_view,
            ticket_type: ticket_type,
            entrance: entrance,
            play_guide: play_guide
          )

          # 座席の作成
          seat = Seat.create!(
            seat_area: ticket_params[:seat_area],
            seat_number: ticket_params[:seat_number],
            ticket: ticket
          )

          # 特典の作成
          benefits = ticket_params[:benefits]
          benefits.each do |benefit_params|
            benefit = Benefit.create!(
              ticket: ticket,
              name: benefit_params[:name],
              details: benefit_params[:details]
            )
          end
        end
      end

      render json: { message: "チケットが正常に発行されました" }, status: :created

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
