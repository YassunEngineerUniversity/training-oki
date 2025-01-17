"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import TicketItemModal from "@/features/ticket-view/components/TicketItemModal"
import TicketStatus from "@/features/ticket-view/components/TicketStatus"
import TicketTransferModal from "@/features/ticket-view/components/TicketTransferModal"
import { Event } from "@/types/event/types"
import { Ticket, TicketDetail } from "@/types/Ticket/types"
import { useEffect, useState } from "react"

interface TicketItemProps {
  username: string
  ticket: TicketDetail
  event: Event
  cookie: string
}

const TicketItem = ({username, ticket, event, cookie}: TicketItemProps) => {
  const [eventState, setEventState] = useState<Event>(event)
  const [ticketState, setTicketState] = useState<TicketDetail>(ticket);
  const [containerStyle, setContainerStyle] = useState("border border-[#1eb98c] p-4 bg-[#66efc8] bg-opacity-20 rounded-sm")

  const isUsedOrTransfered = ticketState.used_time || (ticketState.status === "sending" || ticketState.status === "completed")

  useEffect(() => {
    if(ticketState.used_time) {
      setContainerStyle("border border-red-500 p-4 bg-red-500 bg-opacity-20 rounded-sm")
    }
  },[ticketState.used_time])

  return (
    <Card>
      <CardHeader>
        <div className={containerStyle}>
          <div className="mb-6 flex gap-3">
            <TicketStatus status={ticketState.status} usedTime={ticketState.used_time} />
          </div>
          <h3 className="text-base font-bold">{username}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          {!isUsedOrTransfered && (
            <TicketTransferModal
              event={eventState} 
              ticket={ticketState} 
              username={username} 
              cookie={cookie}
            />
          )}
          <div className="mt-8">
            <span className="font-bold block text-base mb-2">{ticketState.entrance.name}</span>
            <span className="font-bold block text-sm text-[#6b7280] mb-1">{ticketState.seat.seat_area}</span>
            <span className="font-bold block text-base">{ticketState.seat.seat_number}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TicketItemModal
          event={eventState}
          ticket={ticketState}
          username={username}
          setTicketState={setTicketState}
        />
      </CardFooter>
    </Card>
  )
}

export default TicketItem