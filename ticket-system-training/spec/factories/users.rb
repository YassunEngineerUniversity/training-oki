# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :string
#  email           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  password_digest :string
#
FactoryBot.define do
  factory :user do
    name { "ユーザA" }
    email { "userA@example.com" }
    password { "passwordA" }

    trait :user02 do
      name { "ユーザB" }
      email { "userB@example.com" }
      password { "passwordB" }
    end

    trait :user03 do
      name { "ユーザC" }
      email { "userC@example.com" }
      password { "passwordC" }
    end
  end
end
