import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import BenefitConfirmModal from '@/features/ticket/components/BenefitConfirmModal'

const BenefitItem = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="text-lg font-bold">特典名</h4>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-7">特典詳細特典詳細特典詳細特典詳細特典詳細特典詳細特典詳細特典詳細特典詳細特典詳細</p>
      </CardContent>
      <CardFooter>
        <BenefitConfirmModal/>
      </CardFooter>
    </Card>
  )
}

export default BenefitItem