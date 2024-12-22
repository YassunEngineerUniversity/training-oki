# == Schema Information
#
# Table name: tickets
#
#  id             :integer          not null, primary key
#  used_time      :datetime
#  transfer_time  :datetime
#  ticket_type_id :integer          not null
#  entrance_id    :integer          not null
#  ticket_view_id :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
FactoryBot.define do
  factory :ticket do
    used_time { nil }
    transfer_time { nil }
    association :play_guide
    association :ticket_type
    association :entrance
    association :ticket_view
  end
end
