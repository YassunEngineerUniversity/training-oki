json.id @ticket_view.id
json.user_id @ticket_view.user_id

json.event do
  json.id @ticket_view.event.id
  json.name @ticket_view.event.name
  json.details @ticket_view.event.details
  json.date @ticket_view.event.date
  json.venue @ticket_view.event.venue
  json.open_time @ticket_view.event.open_time
  json.start_time @ticket_view.event.start_time
  json.end_time @ticket_view.event.end_time

  json.show do
    json.id @ticket_view.event.show.id
    json.name @ticket_view.event.show.name
  end
end

json.tickets @filtered_tickets do | filtered_ticket |
  ticket = filtered_ticket[:ticket]
  to_user = filtered_ticket[:to_user]
  from_user = filtered_ticket[:from_user]
  transfer = filtered_ticket[:transfer]

  json.id ticket.id
  json.used_time ticket.used_time
  json.transfer_time ticket.transfer_time

  if transfer.nil?
    json.status nil
  else
    json.status transfer.status
  end

  if to_user.nil?
    json.to_user nil
  else
    json.to_user do
      json.id to_user.id
      json.name to_user.name
      json.email to_user.email
    end
  end

  if from_user.nil?
    json.from_user nil
  else
    json.from_user do
      json.id from_user.id
      json.name from_user.name
      json.email from_user.email
    end
  end

  json.ticket_type do
    json.id ticket.ticket_type.id
    json.name ticket.ticket_type.name
    json.price ticket.ticket_type.price
  end

  json.entrance do
    json.id ticket.entrance.id
    json.name ticket.entrance.name
  end

  json.seat do
    json.id ticket.seat.id
    json.seat_area ticket.seat.seat_area
    json.seat_number ticket.seat.seat_number
  end

  json.play_guide do
    json.id ticket.play_guide.id
    json.name ticket.play_guide.name
  end
end


