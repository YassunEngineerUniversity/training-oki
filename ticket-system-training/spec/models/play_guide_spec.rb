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
require 'rails_helper'

RSpec.describe PlayGuide, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
