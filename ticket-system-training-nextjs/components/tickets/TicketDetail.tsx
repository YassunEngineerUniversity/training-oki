import TicketDetailCard from '@/components/tickets/TicketDetailCard'
import { Ticket } from '@/types/Ticket/types'

interface TicketDetailCardProps {
  username: string
  tickets: Ticket[] | []
}

const TicketDetail = ({username, tickets}: TicketDetailCardProps) => {
  return (
    <>
      <div className="mt-4">
        {tickets?.map(ticket => (
          <TicketDetailCard username={username} ticket={ticket} key={ticket.id}/>
        ))}
      </div>
    </>
  )
}

export default TicketDetail