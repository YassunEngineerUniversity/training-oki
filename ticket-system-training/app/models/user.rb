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
class User < ApplicationRecord
  has_secure_password
  has_many :ticket_views
  has_many :sent_transfers, class_name: 'Transfer', foreign_key: 'from_user_id', dependent: :destroy
  has_many :received_transfers, class_name: 'Transfer', foreign_key: 'to_user_id', dependent: :destroy

  has_many :tickets, through: :ticket_views
  has_many :benefits, through: :tickets
end
