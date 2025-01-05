import TicketItem from '@/components/tickets/TicketItem'
import { TicketViewsMine } from '@/types/ticektView/types'

interface TicketListProps {
  ticketViews: TicketViewsMine[] | []
}

const TicketsList = ({ticketViews}:TicketListProps) => {
  return (
    <div className="space-y-4 max-w-[560px] mx-auto py-8 ">
      {ticketViews?.map(ticketView => (
        <TicketItem ticketView={ticketView} key={ticketView.id}/>
      ))}
    </div>
  )
}

export default TicketsList