class AddAuthenticationFieldsToPlayGuides < ActiveRecord::Migration[7.2]
  def change
    add_column :play_guides, :username, :string
    add_column :play_guides, :password_digest, :string
    add_column :play_guides, :api_token, :string

    add_index :play_guides, :username, unique: true
    add_index :play_guides, :api_token, unique: true
  end
end
