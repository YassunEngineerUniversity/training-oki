import TicketItem from '@/components/tickets/TicketItem'
import { TicketViewsMine } from '@/types/ticektView/types'

interface TicketListProps {
  ticketViews: TicketViewsMine[] | []
  tabValue: string
}

const TicketsList = ({ticketViews, tabValue}:TicketListProps) => {
  return (
    <div className="space-y-4 max-w-[560px] mx-auto py-8 ">
      {ticketViews?.map(ticketView => (
        <TicketItem tabValue={tabValue} ticketView={ticketView} key={ticketView.id}/>
      ))}
    </div>
  )
}

export default TicketsList