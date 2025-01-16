import TicketDetailCard from '@/components/tickets/TicketDetailCard'
import { TicketViewsDetail, TicketViewsMine } from '@/types/ticektView/types'

interface TicketDetailCardProps {
  username: string
  ticketView: TicketViewsDetail
  params: string | undefined
  cookie: string
}

const TicketDetail = ({username, ticketView, params, cookie}: TicketDetailCardProps) => {
  return (
    <>
      <div className="mt-4 space-y-5">
        {ticketView.tickets?.map(ticket => (
          <TicketDetailCard 
            username={username} 
            event={ticketView.event} 
            ticket={ticket} 
            key={ticket.id}
            params={params}
            cookie={cookie}
          />
        ))}
      </div>
    </>
  )
}

export default TicketDetail