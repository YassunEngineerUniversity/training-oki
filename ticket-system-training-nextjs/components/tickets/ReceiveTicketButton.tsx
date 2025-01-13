"use client"

import { receiveTicket } from "@/actions/ticket/receiveTicket"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ReceiveTicketButtonProps {
  ticketId: string
} 

export const ReceiveTicketButton = ({ticketId}:ReceiveTicketButtonProps) => {
  const router = useRouter()
  const handleRecieveTicket = receiveTicket.bind(null, ticketId)

  const handleReciveButton = async () => {
    try {
      const response = await handleRecieveTicket();
      if(!response) return

      router.push("/")
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Button onClick={handleReciveButton} className="text-white rounded-full px-10 h-[42px] bg-yellow-500 border border-yellow-500 hover:opacity-70 hover:bg-yellow-500">受け取る</Button>
  )
}