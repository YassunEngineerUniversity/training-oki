"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const BenefitTicketCard = () => {
  const [containerStyle, setContainerStyle] = useState("border border-[#1eb98c] p-4 bg-[#66efc8] bg-opacity-20 rounded-sm")

  // useEffect(() => {
  //   if(ticketState.used_time) {
  //     setContainerStyle("border border-red-500 p-4 bg-red-500 bg-opacity-20 rounded-sm")
  //   }
  // },[ticketState.used_time])
  return (
    <Card>
      <CardHeader>
        <div className={containerStyle}>
          <div className="mb-6 flex gap-3">
            {/* <TicketStatus status={ticketState.status} usedTime={ticketState.used_time} /> */}
          </div>
          <h3 className="text-base font-bold">{"名前"}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="mt-8">
            {/* <span className="font-bold block text-base mb-2">{ticketState.entrance.name}</span>
            <span className="font-bold block text-sm text-[#6b7280] mb-1">{ticketState.seat.seat_area}</span>
            <span className="font-bold block text-base">{ticketState.seat.seat_number}</span> */}
            <span className="font-bold block text-base mb-2">テスト</span>
            <span className="font-bold block text-sm text-[#6b7280] mb-1">テスト</span>
            <span className="font-bold block text-base">テスト</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BenefitTicketCard