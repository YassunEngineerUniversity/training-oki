import ContentContainer from '@/components/utils/ContentContainer'
import BenefitList from '@/features/ticket/components/BenefitList'
import BenefitTicketCard from '@/features/ticket/components/BenefitTicketCard'
import React from 'react'

const BenefitsPage = () => {
  return (
    <ContentContainer>
      <h2 className="text-center text-base font-bold mb-4">チケット特典</h2>
      <BenefitTicketCard/>
      <div className="mt-4">
        <BenefitList/>
      </div>
    </ContentContainer>
  )
}

export default BenefitsPage