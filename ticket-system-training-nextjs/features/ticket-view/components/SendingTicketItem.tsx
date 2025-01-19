import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SendingTicket } from '@/types/ticket/types';

interface SendingTicketDetailProps {
  ticket: SendingTicket;
}

const SendingTicketItem = ({ ticket }: SendingTicketDetailProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="border border-yellow-500 p-4 bg-yellow-500 bg-opacity-20 rounded-sm">
            <div className="mb-6">
              <span className="bg-yellow-500 py-1 px-2 text-sm text-white rounded-sm font-semibold">
                受け取り待ち
              </span>
            </div>
            <h3 className="text-base font-bold mb-2">
              受け取り先 : {ticket.to_user.name}
            </h3>
            <h3 className="text-base font-bold">
              メールアドレス : {ticket.to_user.email}
            </h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <span className="font-bold block text-base mb-2">
              {ticket.entrance.name}
            </span>
            <span className="font-bold block text-sm text-[#6b7280] mb-1">
              {ticket.seat.seat_area}
            </span>
            <span className="font-bold block text-base">
              {ticket.seat.seat_number}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendingTicketItem;
