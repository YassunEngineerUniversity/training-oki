import TicketDetailCard from '@/components/tickets/TicketDetailCard'
import { TicketViewsMine } from '@/types/ticektView/types'
import { Ticket } from '@/types/Ticket/types'

interface TicketDetailCardProps {
  username: string
  ticketView: TicketViewsMine
}

const TicketDetail = ({username, ticketView}: TicketDetailCardProps) => {
  return (
    <>
      <div className="mt-4">
        {ticketView.tickets?.map(ticket => (
          <TicketDetailCard username={username} event={ticketView.event} ticket={ticket} key={ticket.id}/>
        ))}
      </div>
    </>
  )
}

export default TicketDetail