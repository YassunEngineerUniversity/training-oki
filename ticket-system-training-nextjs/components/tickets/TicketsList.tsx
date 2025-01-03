import TicketItem from '@/components/tickets/TicketItem'
import React from 'react'

const TicketsList = () => {
  return (
    <div className="space-y-4 max-w-[560px] mx-auto py-8 ">
      <TicketItem/>
      <TicketItem/>
    </div>
  )
}

export default TicketsList