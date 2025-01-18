import { useEffect, useState } from "react"

const GREEN = "border border-[#1eb98c] p-4 bg-[#66efc8] bg-opacity-20 rounded-sm"
const RED = "border border-red-500 p-4 bg-red-500 bg-opacity-20 rounded-sm"

const useTicketStatus = (usedTime:string | null) => {
  const [containerStyle, setContainerStyle] = useState(GREEN)
  useEffect(() => {
    if(usedTime) {
      setContainerStyle(RED)
    }
  },[usedTime])

  return {
    containerStyle
  }
}


export default useTicketStatus