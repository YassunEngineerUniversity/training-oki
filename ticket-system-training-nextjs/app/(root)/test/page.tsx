"use client"

import { getCookie } from "cookies-next/client";

const page = () => {
  const cookie = getCookie("__session")
  
  return (
    <div>page</div>
  )
}

export default page