"use client"

import { Button } from "@/components/ui/button"
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { ReceiveTicketButton } from "@/features/ticket-view/components/ReceiveTicketButton"
import { Event } from "@/types/event/types"
import { TicketDetail } from "@/types/Ticket/types"
import { formatDate } from "@/utils/formatDate"
import { useState } from "react"

interface ReceiveTicketConfirmModalProps {
  event: Event
  ticket: TicketDetail
}

export const ReceiveTicketConfirmModal = ({event, ticket}:ReceiveTicketConfirmModalProps) => {
  const [isReceived, setIsReceived] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="m-auto">
          <Button className="text-white rounded-full px-10 h-[42px] bg-yellow-500 border border-yellow-500 hover:opacity-70 hover:bg-yellow-500">チケットを受け取る</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle >
            <div className="">
              <h3 className="text-center">チケットを受け取る</h3>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="mt-4">
            <h4 className="text-xl font-bold">{event.name}</h4>
            <div>
              <span className="text-[#6b7280]">日程｜</span>
              <span className="text-base font-bold">{formatDate(event.date)}</span>
            </div>
            <div>
              <span className="text-[#6b7280]">会場｜</span>
              <span className="font-bold">{event.venue}</span>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="font-bold text-base">{ticket.entrance.name}</span>
              <span className="font-bold text-base">{ticket.seat.seat_area}</span>
              <span className="font-bold text-base">{ticket.seat.seat_number}</span>
            </div>
            <div className="mt-4">
              <span className="">送り元 | </span>
              <span className="font-bold">{ticket.from_user?.name}</span>
            </div>
            <div className="">
              <span className="">メールアドレス | </span>
              <span className="font-bold">{ticket.from_user?.email}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-center mt-4 mb-4">
          {isReceived? (
            <p className="text-xl text-yellow-500 font-bold text-center">チケットを受け取りました</p>
          ):(
            <div className="flex justify-center gap-4 items-center">
              <ReceiveTicketButton setIsReceived={setIsReceived} ticketId={ticket.id}/>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}