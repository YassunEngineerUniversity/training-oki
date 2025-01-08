import { getTicketViewMe } from "@/actions/ticketview/getTicketViewMe";
import { getCurrentUser } from "@/actions/user/getCurrentUser";
import TicketDetail from "@/components/tickets/TicketDetail";

import TicketEventCard from "@/components/tickets/TicketEventCard";
import { redirect } from "next/navigation";

const TicketDetailPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: { [key: string]: string | undefined }
}) => {
  const currentUser = await getCurrentUser();
  const ticektViewId = (await params).id;
  const ticektView = await getTicketViewMe(ticektViewId);
  const emailParams = searchParams.email
  
  if (!currentUser) {
    redirect('/login');
  }

  return (
    <div className="bg-[#f1f3f5] min-h-[80vh] py-8">
      <div className="w-[560px] mx-auto">
        <h2 className="text-center text-base font-bold mb-4">チケット詳細</h2>
        <TicketEventCard event={ticektView.event}/>
        <div className="mt-4">
          <TicketDetail username={currentUser.name} ticketView={ticektView} params={emailParams}/>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage