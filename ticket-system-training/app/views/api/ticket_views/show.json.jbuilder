if @filter_params && @filter_params == "sending"
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
  
  json.tickets @ticket_with_users do |ticket_with_user|
    ticket = ticket_with_user[:ticket]
    to_user = ticket_with_user[:to_user]

    json.id ticket.id
    json.used_time ticket.used_time
    json.transfer_time ticket.transfer_time
  
    json.ticket_type do
      json.id ticket.ticket_type.id
      json.name ticket.ticket_type.name
      json.price ticket.ticket_type.price
    end

    json.to_user do
      if to_user
        json.id to_user.id
        json.name to_user.name
        json.email to_user.email
      end
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
else
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
  json.tickets @ticket_view.tickets do |ticket|
    json.id ticket.id
    json.used_time ticket.used_time
    json.transfer_time ticket.transfer_time
  
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
end

