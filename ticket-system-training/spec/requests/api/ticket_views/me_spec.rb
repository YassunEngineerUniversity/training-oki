require 'rails_helper'

RSpec.describe "Api::TicketViews", type: :request do
  let!(:organizer) { FactoryBot.create(:organizer) }
  let!(:play_guides) { FactoryBot.create_list(:play_guide, 3) }
  let!(:show) { FactoryBot.create(:show, organizer: organizer) }
  let!(:events) { FactoryBot.create_list(:event, 5, show: show) }

  let!(:user) { FactoryBot.create(:user) }
  let!(:other_user) { FactoryBot.create(:user, :user02) }

  let!(:ticket_view) { FactoryBot.create(:ticket_view, user: user, event: events[0]) } 
  let!(:ticket_view_02) { FactoryBot.create(:ticket_view, user: user, event: events[1]) } 
  let!(:other_user_ticket_view) { FactoryBot.create(:ticket_view, user: other_user, event: events[0]) }
  let!(:other_user_ticket_view_02) { FactoryBot.create(:ticket_view, user: other_user, event: events[1]) }

  let!(:ticket_types) { FactoryBot.create_list(:ticket_type, 5, event: events[0]) }
  let!(:ticket_types_02) { FactoryBot.create_list(:ticket_type, 5, event: events[1]) }

  let!(:tickets) { FactoryBot.create_list(:ticket, 5, ticket_view: ticket_view, ticket_type: ticket_types[0], play_guide: play_guides[0]) }
  let!(:tickets02) { FactoryBot.create_list(:ticket, 5, ticket_view: ticket_view_02, ticket_type: ticket_types_02[0], play_guide: play_guides[1]) }
  let!(:tickets03) { FactoryBot.create_list(:ticket, 5, ticket_view: other_user_ticket_view, ticket_type: ticket_types[0], play_guide: play_guides[2]) }

  let(:json_response) { JSON.parse(response.body) }

  # subject: APIリクエストの実行
  subject { get "/api/ticket_views/me", params: request_params }

  # 成功
  shared_examples "Successful case" do
    it "HTTPステータス200が返る" do
      subject
      expect(response).to have_http_status(:ok)
    end

    it "期待したデータが取得できる" do
      subject
      expect(json_response).not_to be_empty

      ticket_view_json = json_response[0]

      # チケットビューの確認
      expect(ticket_view_json["id"]).to eq(ticket_view.id)
      expect(ticket_view_json["user_id"]).to eq(ticket_view.user_id)

      # イベントの確認
      event_json = ticket_view_json["event"]
      expect(event_json["id"]).to eq(events[0].id)
      expect(event_json["name"]).to eq(events[0].name)
      expect(event_json["details"]).to eq(events[0].details)
      expect(event_json["date"]).to eq(events[0].date&.strftime("%Y-%m-%d"))
      expect(event_json["venue"]).to eq(events[0].venue)
      expect(event_json["open_time"]).to eq(events[0].open_time&.strftime("%Y-%m-%dT%H:%M:%S.%LZ"))
      expect(event_json["start_time"]).to eq(events[0].start_time&.strftime("%Y-%m-%dT%H:%M:%S.%LZ"))
      expect(event_json["end_time"]).to eq(events[0].end_time&.strftime("%Y-%m-%dT%H:%M:%S.%LZ"))

      # 興行の確認
      show_json = event_json["show"]
      expect(show_json["id"]).to eq(show.id)
      expect(show_json["name"]).to eq(show.name)

      # チケットの確認
      tickets_json = ticket_view_json["tickets"]
      expect(tickets_json.size).to eq(5)
      tickets_json.each_with_index do |ticket_json, index|
        ticket = tickets[index]
        expect(ticket_json["id"]).to eq(ticket.id)
        expect(ticket_json["used_time"]).to eq(ticket.used_time&.strftime("%Y-%m-%dT%H:%M:%S.%LZ"))
        expect(ticket_json["transfer_time"]).to eq(ticket.transfer_time&.strftime("%Y-%m-%dT%H:%M:%S.%LZ"))

        play_guide_json = ticket_json["play_guide"]
        expect(play_guide_json["id"]).to eq(play_guides[0].id)
        expect(play_guide_json["name"]).to eq(play_guides[0].name)
      end
    end
  end

  # エラー
  shared_examples "Error case" do |status, error_message|
    it "指定したステータスとエラーメッセージが返る" do
      subject
      expect(response).to have_http_status(status)
      expect(json_response["error"]).to eq(error_message)
    end
  end

  context "正常系: リクエストが正常で期待しているデータが取得できる" do
    let(:request_params) { { user_id: user.id } }
    include_examples "Successful case"
  end

  # エラーケース: データが存在しない場合
  context "異常系: データが存在しない場合" do
    let(:request_params) { { user_id: 9999 } }
    include_examples "Error case", :not_found, "チケットビューが存在しないです。"
  end
end