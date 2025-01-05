import { getCurrentUser } from "@/actions/user/getCurrentUser";
import TicketDetailCard from "@/components/tickets/TicketDetailCard";

import TicketEventCard from "@/components/tickets/TicketEventCard";
import { redirect } from "next/navigation";

const TicketDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/login');
  }

  return (
    <div className="bg-[#f1f3f5] min-h-[80vh] py-8">
      <div className="w-[560px] mx-auto">
        <h2 className="text-center text-base font-bold mb-4">チケット詳細</h2>
        <TicketEventCard/>
        <div className="mt-4">
          <TicketDetailCard/>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage