import RecieveTicketItem from '@/features/ticket-view/components/ReceiveTicketItem';
import TicketEventCard from '@/features/ticket-view/components/TicketEventCard';
import { getCurrentUser } from '@/utils/getCurrentUser';
import { getTicketViewDetail } from '@/utils/getTicketViewDetail';

import { TicketDetail } from '@/types/ticket/types';
import { redirect } from 'next/navigation';

const TicketViewReceiveDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const currentUser = await getCurrentUser();
  const ticektViewId = (await params).id;
  const ticektView = await getTicketViewDetail(ticektViewId, 'receive');

  if (!currentUser) {
    redirect('/login');
  }

  return (
    <div className="bg-[#f1f3f5] min-h-[80vh] py-8">
      <div className="w-[560px] mx-auto">
        <h2 className="text-center text-base font-bold mb-4">
          受け取りチケット詳細
        </h2>
        <TicketEventCard event={ticektView.event} />
        <div className="mt-4 space-y-5">
          {ticektView.tickets?.map((ticket: TicketDetail) => (
            <RecieveTicketItem
              event={ticektView.event}
              ticket={ticket}
              key={ticket.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketViewReceiveDetailPage;
