'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'


export const SlidingButton = () => {
  const [isCompleted, setIsCompleted] = useState(false)

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x >= 200) {  // スライドが完了したとみなす距離
      setIsCompleted(true)
    }
  }

  return (
    <div className="relative max-w-[320px] w-full h-16 bg-gray-200 rounded-full overflow-hidden">
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        スライドして消し込み
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 220 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={isCompleted ? { x: 220 } : { x: 0 }}
        className="absolute left-0 top-0 w-[100px] h-16 bg-[#1eb98c] rounded-full flex items-center justify-center cursor-grab"
      >
        <span className="text-white font-bold">
          {isCompleted ? '完了' : 'スライド'}
        </span>
      </motion.div>
    </div>
  )
}

