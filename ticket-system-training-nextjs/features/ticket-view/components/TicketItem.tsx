

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import TicketItemModal from "@/features/ticket-view/components/TicketItemModal"
import TicketStatus from "@/features/ticket-view/components/TicketStatus"
import TicketTransferModal from "@/features/ticket-view/components/TicketTransferModal"
import { Event } from "@/types/event/types"
import { TicketDetail } from "@/types/Ticket/types"

interface TicketItemProps {
  username: string
  ticket: TicketDetail
  event: Event
  params: string | undefined
  cookie: string
}

const TicketItem = ({username, ticket, event, params, cookie}: TicketItemProps) => {
  const isUsedOrTransfered = ticket.used_time || (ticket.status === "sending" || ticket.status === "completed")

  const containerStyle = ticket.used_time
    ? "border border-red-500 p-4 bg-red-500 bg-opacity-20 rounded-sm"
    : "border border-[#1eb98c] p-4 bg-[#66efc8] bg-opacity-20 rounded-sm"

  return (
    <Card>
      <CardHeader>
        <div className={containerStyle}>
          <div className="mb-6 flex gap-3">
            <TicketStatus status={ticket.status} usedTime={ticket.used_time} />
          </div>
          <h3 className="text-base font-bold">{username}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          {!isUsedOrTransfered && (
            <TicketTransferModal
              event={event} ticket={ticket} 
              username={username} 
              cookie={cookie}
            />
          )}
          <div className="mt-8">
            <span className="font-bold block text-base mb-2">{ticket.entrance.name}</span>
            <span className="font-bold block text-sm text-[#6b7280] mb-1">{ticket.seat.seat_area}</span>
            <span className="font-bold block text-base">{ticket.seat.seat_number}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TicketItemModal
          event={event}
          ticket={ticket}
          username={username}
        />
      </CardFooter>
    </Card>
  )
}

export default TicketItem