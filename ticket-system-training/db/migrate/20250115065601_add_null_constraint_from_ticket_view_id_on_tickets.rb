class AddNullConstraintFromTicketViewIdOnTickets < ActiveRecord::Migration[7.2]
  def up
    change_column_null :tickets, :ticket_view_id, false
  end

  def down
    change_column_null :tickets, :ticket_view_id, true
  end
end
