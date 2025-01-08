import Form from 'next/form'
import { Button } from "@/components/ui/button"
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Event } from "@/types/event/types"
import { Ticket } from "@/types/Ticket/types"
import { formatDate } from "@/utils/formatDate"
import { DialogClose } from "@radix-ui/react-dialog"
import { getUserByEmail } from '@/actions/user/getUserByEmail'

interface TicketTransferModalProps {
  username: string
  ticket: Ticket
  event: Event
  params: string | undefined
}

const TicketTransferModal = async ({username, ticket, event, params}: TicketTransferModalProps) => {
  let toUser = null
  if(params !== undefined) {
    toUser = await getUserByEmail(params)
  }

  console.log(toUser);
  
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
            <Form action="" className="mt-3 flex space-x-2 mb-4 w-full items-center">
              <Input
                type="text"
                placeholder="メールアドレスで検索"
                className="h-11"
                name="email"
              />
              <Button type="submit" className="h-11 px-5 bg-red-300 hover:bg-bg-red-300 hover:opacity-80">検索</Button>
            </Form>
            {toUser && toUser.email && (
            <div className="grid gap-6 mb-8 px-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold block">{toUser.name}</span>
                  <span className="block text-sm">{toUser.email}</span>
                </div>
                <div>
                  <Button className="" variant="secondary">選択する</Button>
                </div>
              </div>
            </div>
            )}
            {toUser && toUser.message && (
              <p className="text-base font-bold pl-4">ユーザが見つかりませんでした</p>
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

export default TicketTransferModal