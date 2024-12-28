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
#  play_guide_id  :integer
#
class Ticket < ApplicationRecord
  belongs_to :ticket_type
  belongs_to :entrance
  belongs_to :ticket_view
  belongs_to :play_guide

  has_many :benefits, dependent: :destroy
end
