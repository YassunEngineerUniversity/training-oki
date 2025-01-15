# 大量データ生成版
# 環境ごとに必須なレコードを生成します。このコードは冪等性を持たせ、どの環境でも実行可能とします。

# ユーザデータ挿入
User.create!([
  { name: 'テストユーザA', email: 'userA@example.com', password: 'password' },
  { name: 'テストユーザB', email: 'userB@example.com', password: 'password' },
  { name: 'テストユーザC', email: 'userC@example.com', password: 'password' },
  { name: 'テストユーザD', email: 'userD@example.com', password: 'password' },
  { name: 'テストユーザE', email: 'userE@example.com', password: 'password' },
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
  { name: 'ウィンターフェスティバル2025 公演3', details: 'ウィンターフェスティバル2025の詳細 公演3', date: '2025-12-12', venue: '会場3', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 2 },
  { name: 'アートフェスタ2025 公演1', details: 'アートフェスタ2025の詳細 公演1', date: '2025-09-20', venue: '会場1', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 3 },
  { name: 'アートフェスタ2025 公演2', details: 'アートフェスタ2025の詳細 公演2', date: '2025-09-21', venue: '会場2', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 3 },
  { name: 'アートフェスタ2025 公演3', details: 'アートフェスタ2025の詳細 公演3', date: '2025-09-22', venue: '会場3', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 3 },
  { name: 'クラシックナイト 公演1', details: 'クラシックナイトの詳細 公演1', date: '2025-11-05', venue: '会場1', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 4 },
  { name: 'クラシックナイト 公演2', details: 'クラシックナイトの詳細 公演2', date: '2025-11-06', venue: '会場2', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 4 },
  { name: 'クラシックナイト 公演3', details: 'クラシックナイトの詳細 公演3', date: '2025-11-07', venue: '会場3', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 4 },
  { name: 'ロックフェスティバル 公演1', details: 'ロックフェスティバルの詳細 公演1', date: '2025-08-25', venue: '会場1', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 5 },
  { name: 'ロックフェスティバル 公演2', details: 'ロックフェスティバルの詳細 公演2', date: '2025-08-26', venue: '会場2', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 5 },
  { name: 'ロックフェスティバル 公演3', details: 'ロックフェスティバルの詳細 公演3', date: '2025-08-27', venue: '会場3', open_time: '17:00:00', start_time: '18:00:00', end_time: '21:00:00', show_id: 5 }
])

# 券種データ挿入
TicketType.create!([
  { name: 'サマーライブ2025 公演1 券種1', price: 5000, event_id: 1 },
  { name: 'サマーライブ2025 公演1 券種2', price: 7000, event_id: 1 },
  { name: 'サマーライブ2025 公演2 券種1', price: 5000, event_id: 2 },
  { name: 'サマーライブ2025 公演2 券種2', price: 7000, event_id: 2 },
  { name: 'サマーライブ2025 公演3 券種1', price: 5000, event_id: 3 },
  { name: 'サマーライブ2025 公演3 券種2', price: 7000, event_id: 3 },
  { name: 'ウィンターフェスティバル2025 公演1 券種1', price: 5000, event_id: 4 },
  { name: 'ウィンターフェスティバル2025 公演1 券種2', price: 7000, event_id: 4 },
  { name: 'ウィンターフェスティバル2025 公演2 券種1', price: 5000, event_id: 5 },
  { name: 'ウィンターフェスティバル2025 公演2 券種2', price: 7000, event_id: 5 },
  { name: 'ウィンターフェスティバル2025 公演3 券種1', price: 5000, event_id: 6 },
  { name: 'ウィンターフェスティバル2025 公演3 券種2', price: 7000, event_id: 6 },
  { name: 'アートフェスタ2025 公演1 券種1', price: 5500, event_id: 7 },
  { name: 'アートフェスタ2025 公演1 券種2', price: 7500, event_id: 7 },
  { name: 'アートフェスタ2025 公演2 券種1', price: 5500, event_id: 8 },
  { name: 'アートフェスタ2025 公演2 券種2', price: 7500, event_id: 8 },
  { name: 'アートフェスタ2025 公演3 券種1', price: 5500, event_id: 9 },
  { name: 'アートフェスタ2025 公演3 券種2', price: 7500, event_id: 9 },
  { name: 'クラシックナイト 公演1 券種1', price: 6000, event_id: 10 },
  { name: 'クラシックナイト 公演1 券種2', price: 8000, event_id: 10 },
  { name: 'クラシックナイト 公演2 券種1', price: 6000, event_id: 11 },
  { name: 'クラシックナイト 公演2 券種2', price: 8000, event_id: 11 },
  { name: 'クラシックナイト 公演3 券種1', price: 6000, event_id: 12 },
  { name: 'クラシックナイト 公演3 券種2', price: 8000, event_id: 12 },
  { name: 'ロックフェスティバル 公演1 券種1', price: 4500, event_id: 13 },
  { name: 'ロックフェスティバル 公演1 券種2', price: 6500, event_id: 13 },
  { name: 'ロックフェスティバル 公演2 券種1', price: 4500, event_id: 14 },
  { name: 'ロックフェスティバル 公演2 券種2', price: 6500, event_id: 14 },
  { name: 'ロックフェスティバル 公演3 券種1', price: 4500, event_id: 15 },
  { name: 'ロックフェスティバル 公演3 券種2', price: 6500, event_id: 15 }
])

# 入場口データ挿入
Entrance.create!([
  { name: '入場口1' },
  { name: '入場口2' },
  { name: '入場口3' }
])

# チケットビュー
TicketView.create!([
  { user_id: 1, event_id: 1 },  # サマーライブ2025
  { user_id: 1, event_id: 2 },  # サマーライブ2025
  { user_id: 1, event_id: 15 }, # ロックフェスティバル
  { user_id: 1, event_id: 6 },  # ウィンターフェスティバル2025
  { user_id: 2, event_id: 3 },  # サマーライブ2025
  { user_id: 2, event_id: 4 },  # ウィンターフェスティバル2025
  { user_id: 2, event_id: 5 },  # ウィンターフェスティバル2025
  { user_id: 3, event_id: 7 },  # アートフェスタ2025
  { user_id: 3, event_id: 8 },  # アートフェスタ2025
  { user_id: 4, event_id: 9 },  # アートフェスタ2025
  { user_id: 4, event_id: 10 }, # クラシックナイト
  { user_id: 4, event_id: 11 }, # クラシックナイト
  { user_id: 5, event_id: 12 }, # クラシックナイト
  { user_id: 5, event_id: 13 }, # ロックフェスティバル
  { user_id: 5, event_id: 14 }, # ロックフェスティバル
])

# チケットデータ挿入
Ticket.create!([
  { used_time: nil, transfer_time: nil, play_guide_id: 1, ticket_type_id: 1, entrance_id: 1, ticket_view_id: 1 }, # ユーザA サマーライブ2025 公演1
  { used_time: nil, transfer_time: nil, play_guide_id: 2, ticket_type_id: 3, entrance_id: 2, ticket_view_id: 2 }, # ユーザA サマーライブ2025 公演2
  { used_time: nil, transfer_time: nil, play_guide_id: 3, ticket_type_id: 29, entrance_id: 3, ticket_view_id: 3 }, # ユーザA ロックフェスティバル
  { used_time: nil, transfer_time: nil, play_guide_id: 4, ticket_type_id: 11, entrance_id: 1, ticket_view_id: 4 }, # ユーザA ウィンターフェスティバル2025 公演3
  { used_time: nil, transfer_time: nil, play_guide_id: 5, ticket_type_id: 5, entrance_id: 2, ticket_view_id: 5 }, # ユーザB サマーライブ2025 公演3
  { used_time: nil, transfer_time: nil, play_guide_id: 5, ticket_type_id: 7, entrance_id: 2, ticket_view_id: 6 }, # ユーザB ウィンターフェスティバル2025 公演1
  { used_time: nil, transfer_time: nil, play_guide_id: 5, ticket_type_id: 9, entrance_id: 2, ticket_view_id: 7 }, # ユーザB ウィンターフェスティバル2025 公演2
  { used_time: nil, transfer_time: nil, play_guide_id: 5, ticket_type_id: 13, entrance_id: 2, ticket_view_id: 8 }, # ユーザC アートフェスタ2025 公演1
  { used_time: nil, transfer_time: nil, play_guide_id: 5, ticket_type_id: 15, entrance_id: 2, ticket_view_id: 9 }, # ユーザC アートフェスタ2025 公演2
  { used_time: nil, transfer_time: nil, play_guide_id: 5, ticket_type_id: 17, entrance_id: 1, ticket_view_id: 10 }, # ユーザD アートフェスタ2025 公演3
  { used_time: nil, transfer_time: nil, play_guide_id: 4, ticket_type_id: 19, entrance_id: 1, ticket_view_id: 11 }, # ユーザD クラシックナイト 公演1
  { used_time: nil, transfer_time: nil, play_guide_id: 4, ticket_type_id: 21, entrance_id: 1, ticket_view_id: 12 }, # ユーザD クラシックナイト 公演2
  { used_time: nil, transfer_time: nil, play_guide_id: 4, ticket_type_id: 23, entrance_id: 3, ticket_view_id: 13 }, # ユーザE クラシックナイト 公演3
  { used_time: nil, transfer_time: nil, play_guide_id: 1, ticket_type_id: 25, entrance_id: 3, ticket_view_id: 14 }, # ユーザE ロックフェスティバル 公演1
  { used_time: nil, transfer_time: nil, play_guide_id: 1, ticket_type_id: 27, entrance_id: 3, ticket_view_id: 15 }, # ユーザE ロックフェスティバル 公演2
])

# 座席データ挿入
Seat.create!([
  { seat_area: 'エリア1', seat_number: 101, ticket_id: 1 },
  { seat_area: 'エリア2', seat_number: 102, ticket_id: 2 },
  { seat_area: 'エリア3', seat_number: 103, ticket_id: 3 },
  { seat_area: 'エリア4', seat_number: 104, ticket_id: 4 },
  { seat_area: 'エリア5', seat_number: 105, ticket_id: 5 },
  { seat_area: 'エリア1', seat_number: 101, ticket_id: 6 },
  { seat_area: 'エリア2', seat_number: 102, ticket_id: 7 },
  { seat_area: 'エリア3', seat_number: 103, ticket_id: 8 },
  { seat_area: 'エリア4', seat_number: 104, ticket_id: 9 },
  { seat_area: 'エリア5', seat_number: 105, ticket_id: 10 },
  { seat_area: 'エリア1', seat_number: 101, ticket_id: 11 },
  { seat_area: 'エリア2', seat_number: 102, ticket_id: 12 },
  { seat_area: 'エリア3', seat_number: 103, ticket_id: 13 },
  { seat_area: 'エリア4', seat_number: 104, ticket_id: 14 },
  { seat_area: 'エリア5', seat_number: 105, ticket_id: 15 }
])

# 特典データ挿入
Benefit.create!([
  { name: '特典1', details: 'チケット1に付随する特典', used_time: nil, ticket_id: 1 },
  { name: '特典2', details: 'チケット2に付随する特典', used_time: nil, ticket_id: 2 },
  { name: '特典3', details: 'チケット3に付随する特典', used_time: nil, ticket_id: 3 },
  { name: '特典4', details: 'チケット4に付随する特典', used_time: nil, ticket_id: 4 },
  { name: '特典5', details: 'チケット5に付随する特典', used_time: nil, ticket_id: 5 }
])
