import { getServerCookie } from "@/actions/cookies/getServerCookie";
import { getTicketViewDetail } from "@/actions/ticketview/getTicketViewDetail";
import { getCurrentUser } from "@/actions/user/getCurrentUser";
import ContentContainer from "@/components/utils/ContentContainer";
import TicketEventCard from "@/features/ticket-view/components/TicketEventCard";
import TicketList from "@/features/ticket-view/components/TicketList";

import { redirect } from "next/navigation";

const TicketVeiwDetailPage = async ({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const ticektViewId = (await params).id;
  const emailParams = (await searchParams).email

  const currentUser = await getCurrentUser();
  const ticektView = await getTicketViewDetail(ticektViewId);
  const cookie = await getServerCookie();

  if (!currentUser) {
    redirect('/login');
  }
  
  return (
    <ContentContainer>
      <h2 className="text-center text-base font-bold mb-4">チケット詳細</h2>
      <TicketEventCard event={ticektView.event}/>
      <div className="mt-4">
        <TicketList
          cookie={cookie} 
          username={currentUser.name} 
          ticketView={ticektView} 
        />
      </div>
    </ContentContainer>
  )
}

export default TicketVeiwDetailPage