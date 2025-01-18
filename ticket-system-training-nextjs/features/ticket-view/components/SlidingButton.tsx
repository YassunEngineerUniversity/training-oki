'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { updateUsed } from '@/actions/ticket/updateUsed'
import { Ticket } from '@/types/Ticket/types'

interface SlidingButtonProps {
  ticketId: string
  updateUsedState: () => void
}


export const SlidingButton = ({ticketId, updateUsedState}: SlidingButtonProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleUpdateUsed = updateUsed.bind(null, ticketId);

  const handleSlidingButton = async () => {
    try {
      const used = await handleUpdateUsed();

      if(!used) {
        return
      }

      updateUsedState()
    } catch(error) {
      console.log(error);
    }
  }

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x >= 200) {
      if (formRef.current) {
        formRef.current.requestSubmit()
      }
    }
  }

  return (
    <form ref={formRef} action={handleSlidingButton} className="relative max-w-[320px] w-full h-16 bg-gray-200 rounded-full overflow-hidden">
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        スライドして消し込み
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 220 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: 0 }}
        className="absolute left-0 top-0 w-[100px] h-16 bg-[#1eb98c] rounded-full flex items-center justify-center cursor-grab"
      >
        <span className="text-white font-bold border-none">
          スライド
        </span>
      </motion.div>
      <button type="submit" className="hidden"></button>
    </form>
  )
}

