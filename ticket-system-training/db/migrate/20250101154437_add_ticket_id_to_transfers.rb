class AddTicketIdToTransfers < ActiveRecord::Migration[7.2]
  def change
    add_column :transfers, :ticket_id, :integer, null: true # null: true にして既存データへの影響を回避
    add_index :transfers, :ticket_id
  end
end
