# == Schema Information
#
# Table name: play_guides
#
#  id                   :integer          not null, primary key
#  name                 :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  password_digest      :string
#  api_token            :string
#  api_token_expires_at :datetime
#
FactoryBot.define do
  factory :play_guide do
    sequence(:name) { |n| "プレイガイド#{('A'.ord + n - 1).chr}" }
    password { "password" }
  end
end
