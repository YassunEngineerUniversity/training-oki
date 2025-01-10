import { getServerCookie } from "@/actions/cookies/getServerCookie";
import { getTicketViewDetail } from "@/actions/ticketview/getTicketViewDetail";
import { getCurrentUser } from "@/actions/user/getCurrentUser";
import SendingTicketDetail from "@/components/tickets/SendingTicketDetail";

import TicketEventCard from "@/components/tickets/TicketEventCard";
import { SendingTicket, Ticket } from "@/types/Ticket/types";
import { redirect } from "next/navigation";

const TicketViewTransferDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>,
}) => {
  const currentUser = await getCurrentUser();
  const ticektViewId = (await params).id;
  const ticektView = await getTicketViewDetail(ticektViewId, "sending");

  if (!currentUser) {
    redirect('/login');
  }
  

  return (
    <div className="bg-[#f1f3f5] min-h-[80vh] py-8">
      <div className="w-[560px] mx-auto">
        <h2 className="text-center text-base font-bold mb-4">譲渡チケット詳細</h2>
        <TicketEventCard event={ticektView.event}/>
        <div className="mt-4 space-y-5">
          {ticektView.tickets?.map((ticket:SendingTicket) => (
            <SendingTicketDetail ticket={ticket}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TicketViewTransferDetailPage