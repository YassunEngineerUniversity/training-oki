import TicketDetailCard from '@/components/tickets/TicketDetailCard'
import { TicketViewsMine } from '@/types/ticektView/types'

interface TicketDetailCardProps {
  username: string
  ticketView: TicketViewsMine
  params: string | undefined
}

const TicketDetail = ({username, ticketView, params}: TicketDetailCardProps) => {
  return (
    <>
      <div className="mt-4">
        {ticketView.tickets?.map(ticket => (
          <TicketDetailCard 
            username={username} 
            event={ticketView.event} 
            ticket={ticket} 
            key={ticket.id}
            params={params}
          />
        ))}
      </div>
    </>
  )
}

export default TicketDetail