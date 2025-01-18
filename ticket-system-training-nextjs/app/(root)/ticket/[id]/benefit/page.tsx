import { getCurrentUser } from '@/actions/user/getCurrentUser'
import ContentContainer from '@/components/utils/ContentContainer'
import BenefitList from '@/features/ticket/components/BenefitList'
import BenefitTicketCard from '@/features/ticket/components/BenefitTicketCard'
import { getTicketDetail } from '@/utils/getTicketDetail'
import { redirect } from 'next/navigation'

const BenefitsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/login');
  }
  
  const ticektId = (await params).id;
  const ticket = await getTicketDetail(ticektId)

  console.log(ticket);
  

  return (
    <ContentContainer>
      <h2 className="text-center text-base font-bold mb-4">チケット特典</h2>
      <BenefitTicketCard username={currentUser.name} ticket={ticket}/>
      <div className="mt-4">
        <BenefitList benefits={ticket.benefits}/>
      </div>
    </ContentContainer>
  )
}

export default BenefitsPage