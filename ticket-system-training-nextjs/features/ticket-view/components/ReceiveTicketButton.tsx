'use client';

import { receiveTicket } from '@/actions/ticket/receiveTicket';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ReceiveTicketButtonProps {
  ticketId: string;
  setIsReceived: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReceiveTicketButton = ({
  ticketId,
  setIsReceived,
}: ReceiveTicketButtonProps) => {
  const router = useRouter();
  const handleReceiveTicket = receiveTicket.bind(null, ticketId);

  const handleReceiveButton = async () => {
    try {
      const response = await handleReceiveTicket();
      if (response.error) {
        // task: 受け取りでErrorが出る場合のエラーハンドリング
        return;
      }

      setIsReceived(true);

      setTimeout(() => {
        router.push('/?tab=receive');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleReceiveButton}
      className="text-white rounded-full px-10 h-[42px] bg-yellow-500 border border-yellow-500 hover:opacity-70 hover:bg-yellow-500"
    >
      受け取る
    </Button>
  );
};
