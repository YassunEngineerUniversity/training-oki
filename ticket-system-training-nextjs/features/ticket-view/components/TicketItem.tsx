'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import TicketItemModal from '@/features/ticket-view/components/TicketItemModal';
import TicketStatus from '@/features/ticket-view/components/TicketStatus';
import TicketTransferModal from '@/features/ticket-view/components/TicketTransferModal';
import useTicketStatus from '@/hooks/useTicketStaus';
import { Event } from '@/types/event/types';
import { TicketDetail } from '@/types/ticket/types';
import Link from 'next/link';
import { useState } from 'react';

interface TicketItemProps {
  username: string;
  ticket: TicketDetail;
  event: Event;
  cookie: string;
}

const TicketItem = ({ username, ticket, event, cookie }: TicketItemProps) => {
  const [eventState, setEventState] = useState<Event>(event);
  const [ticketState, setTicketState] = useState<TicketDetail>(ticket);
  const isUsedOrTransfered =
    ticketState.used_time ||
    ticketState.status === 'sending' ||
    ticketState.status === 'completed';

  const { containerStyle } = useTicketStatus(ticketState.used_time);

  return (
    <Card>
      <CardHeader>
        <div className={containerStyle}>
          <div className="mb-6 flex gap-3">
            <TicketStatus
              status={ticketState.status}
              usedTime={ticketState.used_time}
            />
          </div>
          <h3 className="text-base font-bold">{username}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-end gap-3">
            {!isUsedOrTransfered && (
              <TicketTransferModal
                event={eventState}
                ticket={ticketState}
                username={username}
                cookie={cookie}
              />
            )}
            {ticketState.has_benefits && (
              <Button
                asChild
                className=" text-blue-500 rounded-full bg-white border border-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <Link href={`/ticket/${ticketState.id}/benefit`}>
                  特典を受け取る
                </Link>
              </Button>
            )}
          </div>
          <div className="mt-8">
            <span className="font-bold block text-base mb-2">
              {ticketState.entrance.name}
            </span>
            <span className="font-bold block text-base mb-2">
              {ticketState.ticket_type.name}
            </span>
            <span className="font-bold block text-sm text-[#6b7280] mb-1">
              {ticketState.seat.seat_area}
            </span>
            <span className="font-bold block text-base">
              {ticketState.seat.seat_number}
            </span>
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
  );
};

export default TicketItem;
