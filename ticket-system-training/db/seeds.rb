# 大量データ生成版
# 環境ごとに必須なレコードを生成します。このコードは冪等性を持たせ、どの環境でも実行可能とします。

# ユーザデータ挿入
User.create!([
  { name: 'テストユーザA', email: 'userA@exmple.com', password: 'password' },
  { name: 'テストユーザB', email: 'userB@exmple.com', password: 'password' },
  { name: 'テストユーザC', email: 'userC@exmple.com', password: 'password' },
  { name: 'テストユーザD', email: 'userD@exmple.com', password: 'password' },
  { name: 'テストユーザE', email: 'userE@exmple.com', password: 'password' },
  { name: 'テストユーザF', email: 'userF@exmple.com', password: 'password' }
])

# 興行主
Organizer.create!([
  { name: '株式会社サンプルプロモーション' },
  { name: '合同会社エンタメジャパン' },
  { name: '有限会社ライブクリエイト' },
  { name: '株式会社ミュージックワークス' },
  { name: '合同会社イベントプラン' }
])

# プレイガイド
PlayGuide.create!([
  { name: 'ローソンチケット', password: 'lawson123' },
  { name: 'チケットぴあ', password: 'pia123' },
  { name: 'イープラス', password: 'eplus123' },
  { name: '楽天チケット', password: 'rakuten123' },
  { name: 'LINEチケット', password: 'line123' }
])

# 興行データ
Show.create!([
  { name: 'サマーライブ2025', start_datetime: '2025-07-15 12:00:00', end_datetime: '2025-07-15 20:00:00', details: '夏の音楽イベント', organizer_id: 1 },
  { name: 'ウィンターフェスティバル2025', start_datetime: '2025-12-10 14:00:00', end_datetime: '2025-12-10 22:00:00', details: '冬のスペシャルライブ', organizer_id: 2 },
  { name: 'アートフェスタ2025', start_datetime: '2025-09-20 10:00:00', end_datetime: '2025-09-20 18:00:00', details: 'アートと音楽の融合イベント', organizer_id: 3 },
  { name: 'クラシックナイト', start_datetime: '2025-11-05 17:00:00', end_datetime: '2025-11-05 21:00:00', details: 'クラシック音楽コンサート', organizer_id: 4 },
  { name: 'ロックフェスティバル', start_datetime: '2025-08-25 13:00:00', end_datetime: '2025-08-25 22:00:00', details: 'ロックバンド多数出演', organizer_id: 5 }
])

# 公演データ挿入
Event.create!([
  { name: 'サマーライブ2025 公演1', details: 'サマーライブ2025の詳細 公演1', date: '2025-07-15', venue: '会場1', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 1 },
  { name: 'サマーライブ2025 公演2', details: 'サマーライブ2025の詳細 公演2', date: '2025-07-16', venue: '会場2', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 1 },
  { name: 'サマーライブ2025 公演3', details: 'サマーライブ2025の詳細 公演3', date: '2025-07-17', venue: '会場3', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 1 },
  { name: 'ウィンターフェスティバル2025 公演1', details: 'ウィンターフェスティバル2025の詳細 公演1', date: '2025-12-10', venue: '会場1', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 2 },
  { name: 'ウィンターフェスティバル2025 公演2', details: 'ウィンターフェスティバル2025の詳細 公演2', date: '2025-12-11', venue: '会場2', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 2 },
  { name: 'ウィンターフェスティバル2025 公演3', details: 'ウィンターフェスティバル2025の詳細 公演3', date: '2025-12-12', venue: '会場3', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 2 }
])

# 券種データ挿入
TicketType.create!([
  { name: 'サマーライブ2025 公演1 券種1', price: 5000, event_id: 1 },
  { name: 'サマーライブ2025 公演1 券種2', price: 7000, event_id: 1 },
  { name: 'サマーライブ2025 公演2 券種1', price: 5000, event_id: 2 },
  { name: 'サマーライブ2025 公演2 券種2', price: 7000, event_id: 2 },
  { name: 'サマーライブ2025 公演3 券種1', price: 5000, event_id: 3 },
  { name: 'サマーライブ2025 公演3 券種2', price: 7000, event_id: 3 }
])

# 入場口データ挿入
Entrance.create!([
  { name: '入場口1' },
  { name: '入場口2' },
  { name: '入場口3' }
])

# チケットビュー
TicketView.create!([
  { user_id: 1, event_id: 1 },
  { user_id: 1, event_id: 2 },
  { user_id: 1, event_id: 3 },
  { user_id: 2, event_id: 4 },
  { user_id: 2, event_id: 5 },
  { user_id: 2, event_id: 6 }
])

# チケットデータ挿入
Ticket.create!([
  { used_time: nil, transfer_time: nil, play_guide_id: 1, ticket_type_id: 1, entrance_id: 1, ticket_view_id: 1 },
  { used_time: nil, transfer_time: nil, play_guide_id: 2, ticket_type_id: 2, entrance_id: 2, ticket_view_id: 2 },
  { used_time: nil, transfer_time: nil, play_guide_id: 3, ticket_type_id: 3, entrance_id: 3, ticket_view_id: 3 },
  { used_time: nil, transfer_time: nil, play_guide_id: 4, ticket_type_id: 4, entrance_id: 1, ticket_view_id: 4 },
  { used_time: nil, transfer_time: nil, play_guide_id: 5, ticket_type_id: 5, entrance_id: 2, ticket_view_id: 5 }
])

# 座席データ挿入
Seat.create!([
  { seat_area: 'エリア1', seat_number: 101, ticket_id: 1 },
  { seat_area: 'エリア2', seat_number: 102, ticket_id: 2 },
  { seat_area: 'エリア3', seat_number: 103, ticket_id: 3 },
  { seat_area: 'エリア4', seat_number: 104, ticket_id: 4 },
  { seat_area: 'エリア5', seat_number: 105, ticket_id: 5 }
])

# 特典データ挿入
Benefit.create!([
  { name: '特典1', details: 'チケット1に付随する特典', used_time: nil, ticket_id: 1 },
  { name: '特典2', details: 'チケット2に付随する特典', used_time: nil, ticket_id: 2 },
  { name: '特典3', details: 'チケット3に付随する特典', used_time: nil, ticket_id: 3 },
  { name: '特典4', details: 'チケット4に付随する特典', used_time: nil, ticket_id: 4 },
  { name: '特典5', details: 'チケット5に付随する特典', used_time: nil, ticket_id: 5 }
])
