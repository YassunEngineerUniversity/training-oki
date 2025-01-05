import { TicketViewsMine } from '@/types/ticektView/types';
import { formatDate } from '@/utils/formatDate';
import { formatTime } from '@/utils/formatTime';
import { MapPinHouse, Clock4 } from 'lucide-react';

interface TicketItemProps {
  ticketView: TicketViewsMine
}

const TicketItem = ({ticketView}:TicketItemProps) => {
  return (
    <div className="bg-white px-4 py-4 rounded-2xl cursor-pointer shadow-lg">
      <div className="mb-2">
        <h3 className="text-2xl font-bold">{ticketView.event.name}</h3>
      </div>
      <div className="mb-1">
        <h4 className="text-xl font-bold">{formatDate(ticketView.event.date)}</h4>
      </div>
      <div className="flex gap-2 items-center mb-4">
        <Clock4 width={20} className="text-[#6b7280]"/>
        <div className="flex gap-3 items-center">
          <span className="text-[#6b7280] text-sm font-semibold">開場:{formatTime(ticketView.event.open_time)}</span>
          <span className="text-[#6b7280] text-sm font-semibold">開演:{formatTime(ticketView.event.start_time)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MapPinHouse width={20} />
        <span className="text-base font-semibold">{ticketView.event.venue}</span>
      </div>
    </div>
  )
}

export default TicketItem