'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TicketStatus from '@/features/ticket-view/components/TicketStatus';
import useTicketStatus from '@/hooks/useTicketStaus';
import { Ticket } from '@/types/ticket/types';
import { useState } from 'react';

interface BenefitTicketCardProps {
  username: string;
  ticket: Ticket;
}

const BenefitTicketCard = ({ username, ticket }: BenefitTicketCardProps) => {
  const [ticketState, setTicketState] = useState(ticket);
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
    </Card>
  );
};

export default BenefitTicketCard;
