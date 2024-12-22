class UpdatePlayGuidesForNameUniqueness < ActiveRecord::Migration[7.2]
  def change
    remove_column :play_guides, :username, :string

    add_index :play_guides, :name, unique: true
  end
end
