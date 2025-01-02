class AddStatusToTransfers < ActiveRecord::Migration[7.2]
  def change
    add_column :transfers, :status, :string, default: 'pending', null: false
  end
end
