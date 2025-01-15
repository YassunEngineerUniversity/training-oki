class RemoveNullConstraintFromTicketViewIdOnTickets < ActiveRecord::Migration[7.2]
  def up
    change_column_null :tickets, :ticket_view_id, true
  end

  def down
    change_column_null :tickets, :ticket_view_id, false
  end
end
