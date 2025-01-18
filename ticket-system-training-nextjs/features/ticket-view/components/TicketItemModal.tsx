
"use client"

import { Button } from "@/components/ui/button"
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { SlidingButton } from "@/features/ticket-view/components/SlidingButton"
import { Event } from "@/types/event/types"
import { TicketDetail } from "@/types/Ticket/types"
import { formatDate } from "@/utils/formatDate"
import { DialogClose } from "@radix-ui/react-dialog"

interface TicketItemModalProps {
  username: string
  ticket: TicketDetail
  event: Event
  setTicketState: React.Dispatch<React.SetStateAction<TicketDetail>>
}

const TicketItemModal = ({username, ticket, event, setTicketState}: TicketItemModalProps) => {
  // チケットの状態の消し込みを行う
  const handleUpdateTicketUsed = () => {
    const now = new Date().toISOString();
    setTicketState((prev) => ({
      ...prev,
      used_time: now,
    }));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-center m-auto">
          <Button className="text-white rounded-full px-10 h-[42px] bg-[#1eb98c] border border-[#1eb98c] hover:opacity-70 hover:bg-[#1eb98c]">チケットを表示</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle >
            <div className="">
              <h3 className="text-center">電子チケット</h3>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="max-w-[560px] w-full bg-[#66efc8] bg-opacity-20 m-auto py-10 px-10 rounded-sm">
          <div className="max-w-[375px] w-full m-auto">
            <div className="">
              <h4 className="text-xl font-bold">{event.name}</h4>
              <div>
                <span className="text-[#6b7280]">日程｜</span>
                <span className="text-xl font-bold">{formatDate(event.date)}</span>
              </div>
              <div>
                <span className="text-[#6b7280]">会場｜</span>
                <span className="font-bold">{event.venue}</span>
              </div>
            </div>
            <div className="mt-6">
              <span className="block mb-2 text-center font-bold text-lg">{username}</span>
              <span className="block mb-1 text-center font-bold text-lg text-[#6b7280]">{ticket.seat.seat_area}</span>
              <span className="block text-center font-bold text-lg">{ticket.seat.seat_number}</span>
            </div>
            {ticket.used_time?(
              <div className="mt-10">
                <p className="text-[42px] font-bold text-center text-red-500">入場済み</p>
              </div>
            ):(
              <div className="mt-10">
                <p className="text-lg text-center font-bold text-red-500 mb-4">入場するときにスタッフを見せてください。<br/>スタッフが消し込みを行います。</p>
                <div className="flex justify-center">
                  <SlidingButton updateUsedState={handleUpdateTicketUsed} ticketId={ticket.id}/>
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              閉じる
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TicketItemModal