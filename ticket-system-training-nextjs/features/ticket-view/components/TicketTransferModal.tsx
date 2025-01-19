import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ToUserSearch from '@/features/ticket-view/components/ToUserSearch';
import { Event } from '@/types/event/types';
import { Ticket } from '@/types/ticket/types';
import { formatDate } from '@/utils/formatDate';
import { DialogClose } from '@radix-ui/react-dialog';

interface TicketTransferModalProps {
  username: string;
  ticket: Ticket;
  event: Event;
  cookie: string;
}

const TicketTransferModal = ({
  username,
  ticket,
  event,
  cookie,
}: TicketTransferModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button className="text-[#1eb98c] rounded-full bg-white border border-[#1eb98c] hover:bg-[#1eb98c] hover:text-white">
            チケットを渡す
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
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
              <span className="text-base font-bold">
                {formatDate(event.date)}
              </span>
            </div>
            <div>
              <span className="text-[#6b7280]">会場｜</span>
              <span className="font-bold">{event.venue}</span>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="font-bold text-base">
                {ticket.entrance.name}
              </span>
              <span className="font-bold text-base">
                {ticket.seat.seat_area}
              </span>
              <span className="font-bold text-base">
                {ticket.seat.seat_number}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <ToUserSearch cookie={cookie} ticketId={ticket.id} />
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
  );
};

export default TicketTransferModal;
