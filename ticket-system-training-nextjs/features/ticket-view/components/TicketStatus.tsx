interface TicketStatusProps {
  usedTime: string| null
  status: string | null
}

const TicketStatus = ({usedTime, status}:TicketStatusProps) => {
  if (usedTime) {
    return (
      <div>
        <span className="bg-red-500 py-1 px-2 text-sm text-white rounded-sm font-semibold">
          入場済み
        </span>
      </div>
    )
  }

  if (status === "completed") {
    return (
      <div>
        <span className="bg-yellow-500 py-1 px-2 text-sm text-white rounded-sm font-semibold">
          譲渡されたチケット
        </span>
      </div>
    )
  }

  if (status === "sending") {
    return (
      <div>
        <span className="bg-yellow-500 py-1 px-2 text-sm text-white rounded-sm font-semibold">
          譲渡中のチケット
        </span>
      </div>
    )
  }

  return (
    <div>
      <span className="bg-[#1eb98c] py-1 px-2 text-sm text-white rounded-sm font-semibold">
        利用可能
      </span>
    </div>
  )
}

export default TicketStatus