import TicketItem from '@/features/ticket-view/components/TicketItem'
import { TicketViewsDetail, TicketViewsMine } from '@/types/ticektView/types'

interface TicketListProps {
  username: string
  ticketView: TicketViewsDetail
  params: string | undefined
  cookie: string
}

const TicketList = ({username, ticketView, params, cookie}: TicketListProps) => {
  return (
    <div className="mt-4 space-y-5">
      {ticketView.tickets?.map(ticket => (
        <TicketItem
          username={username} 
          event={ticketView.event} 
          ticket={ticket} 
          key={ticket.id}
          params={params}
          cookie={cookie}
        />
      ))}
    </div>
  )
}

export default TicketList