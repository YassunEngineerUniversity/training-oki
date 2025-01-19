json.id @ticket.id
json.used_time @ticket.used_time
json.transfer_time @ticket.transfer_time

if @ticket.transfer.nil?
  json.status nil
else
  json.status @ticket.transfer.status
end

json.ticket_type do
  json.id @ticket.ticket_type.id
  json.name @ticket.ticket_type.name
  json.price @ticket.ticket_type.price
end

json.entrance do
  json.id @ticket.entrance.id
  json.name @ticket.entrance.name
end

json.seat do
  json.id @ticket.seat.id
  json.seat_area @ticket.seat.seat_area
  json.seat_number @ticket.seat.seat_number
end

json.play_guide do
  json.id @ticket.play_guide.id
  json.name @ticket.play_guide.name
end

json.benefits @ticket.benefits do | benefit |
  json.id benefit.id
  json.name benefit.name
  json.details benefit.details
  json.used_time benefit.used_time
end