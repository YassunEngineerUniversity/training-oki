# == Schema Information
#
# Table name: play_guides
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PlayGuide < ApplicationRecord
  has_secure_password
  before_create :generate_api_token

  has_many :tickets

  def generate_api_token
    self.api_token = SecureRandom.hex(20)
    self.api_token_expires_at = 5.minutes.from_now
  end

  def api_token_valid?
    api_token.present? && api_token_expires_at.present? && api_token_expires_at > Time.current
  end

  def regenerate_api_token
    # api_tokenの有効期限が切れている場合に再生成する
    if api_token_expires_at < Time.current
      self.api_token = SecureRandom.hex(20)
      self.api_token_expires_at = 5.minutes.from_now
      save
    end
  end
end