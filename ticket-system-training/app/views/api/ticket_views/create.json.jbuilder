json.tickets @ticket_view.tickets do |ticket|
  json.id ticket.id
  json.type_name @ticket_type.name
  json.price @ticket_type.price
  json.seat_area @seat.seat_area
  json.seat_number @seat.seat_number
  json.entrance_name @entrance.name

  json.benefits ticket.benefits do |benefit|
    json.name benefit.name
    json.details benefit.details
  end
end