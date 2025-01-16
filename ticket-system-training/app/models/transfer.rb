# == Schema Information
#
# Table name: transfers
#
#  id             :integer          not null, primary key
#  from_user_id   :integer
#  to_user_id     :integer
#  ticket_view_id :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  status         :string           default("pending"), not null
#  ticket_id      :integer
#
class Transfer < ApplicationRecord
  belongs_to :ticket_view
  belongs_to :ticket
  belongs_to :from_user, class_name: 'User', foreign_key: 'from_user_id'
  belongs_to :to_user, class_name: 'User', foreign_key: 'to_user_id'
end
