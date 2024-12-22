class AddTokenExpireAtColumnToPlayGuides < ActiveRecord::Migration[7.2]
  def change
    add_column :play_guides, :api_token_expires_at, :datetime
  end
end
