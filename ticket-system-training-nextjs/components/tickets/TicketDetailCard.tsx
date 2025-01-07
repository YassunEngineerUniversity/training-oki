import TicketDetailModal from "@/components/tickets/TicketDetailModal"
import TicketTransferModal from "@/components/tickets/TicketTransferModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Event } from "@/types/event/types"
import { Ticket } from "@/types/Ticket/types"

interface TicketDetailCardProps {
  username: string
  ticket: Ticket
  event: Event
}

const TicketDetailCard = ({username, ticket, event}: TicketDetailCardProps) => {
  console.log(ticket.used_time);
  return (
    <Card>
      <CardHeader>
        <div className="border border-[#1eb98c] p-4 bg-[#66efc8] bg-opacity-20 rounded-sm">
          <div className="mb-6">
            {ticket.used_time? (
              <span className="bg-red-500 py-1 px-2 text-sm text-white rounded-sm font-semibold">入場済み</span>
            ):(
              <span className="bg-[#1eb98c] py-1 px-2 text-sm text-white rounded-sm font-semibold">利用可能</span>
            )}
          </div>
          <h3 className="text-base font-bold">{username}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <TicketTransferModal event={event} ticket={ticket} username={username}/>
          <div className="mt-8">
            <span className="font-bold block text-base mb-2">{ticket.entrance.name}</span>
            <span className="font-bold block text-sm text-[#6b7280] mb-1">{ticket.seat.seat_area}</span>
            <span className="font-bold block text-base">{ticket.seat.seat_number}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TicketDetailModal event={event} ticket={ticket} username={username}/>
      </CardFooter>
    </Card>
  )
}

export default TicketDetailCard