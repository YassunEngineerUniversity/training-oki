import { getCookie } from "cookies-next/client"

export const getClientCookie = () => {
  const cookie = getCookie("_ticket_system_training_session")
  return cookie
}
