"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import BenefitConfirmModal from '@/features/ticket/components/BenefitConfirmModal'
import { Benefit } from '@/types/benefit/types'

interface BenefitItemProps {
  benefit: Benefit
}

const BenefitItem = ({benefit}:BenefitItemProps) => {
  const [benefitState, setBenefitState] = useState(benefit);

  return (
    <Card>
      <CardHeader>
        <h4 className="text-lg font-bold">{benefitState.name}</h4>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-7">{benefitState.details}</p>
      </CardContent>
      <CardFooter>
        <BenefitConfirmModal benefitName={benefitState.name}/>
      </CardFooter>
    </Card>
  )
}

export default BenefitItem