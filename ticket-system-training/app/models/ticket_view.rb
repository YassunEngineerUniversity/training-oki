# == Schema Information
#
# Table name: ticket_views
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  event_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TicketView < ApplicationRecord
  belongs_to :user
  belongs_to :event

  has_many :transfers, dependent: :destroy
  has_many :tickets, dependent: :destroy
end
