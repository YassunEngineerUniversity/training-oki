import TicketVeiwItem from '@/features/ticket-view/components/TicketViewItem';
import { TicketViewsMine } from '@/types/ticektView/types';

interface TicketVeiwListProps {
  ticketViews: TicketViewsMine[] | [];
  tabValue: string;
}

const TicketVeiwList = ({ ticketViews, tabValue }: TicketVeiwListProps) => {
  return (
    <div className="space-y-4 max-w-[560px] mx-auto py-8 ">
      {ticketViews?.map((ticketView) => (
        <TicketVeiwItem
          tabValue={tabValue}
          ticketView={ticketView}
          key={ticketView.id}
        />
      ))}
    </div>
  );
};

export default TicketVeiwList;
