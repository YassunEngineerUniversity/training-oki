import { SlidingButton } from "@/components/tickets/SlidingButton"
import { Button } from "@/components/ui/button"
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Event } from "@/types/event/types"
import { Ticket } from "@/types/Ticket/types"
import { formatDate } from "@/utils/formatDate"
import { DialogClose } from "@radix-ui/react-dialog"

interface TicketTransferModalProps {
  username: string
  ticket: Ticket
  event: Event
}

const TicketTransferModal = ({username, ticket, event}: TicketTransferModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button className="text-[#1eb98c] rounded-full bg-white border border-[#1eb98c] hover:bg-[#1eb98c] hover:text-white">チケットを渡す</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle >
            <div className="">
              <h3 className="text-center">チケットを渡す</h3>
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
          </div>
          <div className="mt-6">
            <h4 className="font-bold">同行者を選択してください</h4>
            <div className="mt-3 flex space-x-2 mb-4 w-full items-center">
              <Input
                type="text"
                placeholder="名前またはメールアドレスで検索"
                className="h-11"
              />
              <Button className="h-11 px-5 bg-red-300 hover:bg-bg-red-300 hover:opacity-80">検索</Button>
            </div>
            <div className="grid gap-6 mb-8 px-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold block">ユーザ名</span>
                  <span className="block text-sm">test@gmail.com</span>
                </div>
                <div>
                  <Button className="" variant="secondary">選択する</Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold block">ユーザ名</span>
                  <span className="block text-sm">test@gmail.com</span>
                </div>
                <div>
                  <Button className="" variant="secondary">選択する</Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold block">ユーザ名</span>
                  <span className="block text-sm">test@gmail.com</span>
                </div>
                <div>
                  <Button className="" variant="secondary">選択する</Button>
                </div>
              </div>
            </div>
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

export default TicketTransferModal