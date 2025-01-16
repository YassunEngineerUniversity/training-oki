"use server"

import { getServerCookie } from "@/actions/cookies/getServerCookie";
import { toUser } from "@/types/user/types";

interface sendTicketParams {
  ticketId: string
  toUser:toUser | null
}

export const sendTicket = async ({ticketId, toUser}:sendTicketParams) => {
  // toUserのパラメータがnullの場合
  if(!toUser) return

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/tickets/${ticketId}/send`;
  const cookies = await getServerCookie();
  const data = {
    to_user: toUser
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json()
    return error;
  }

  const message = await response.json()
  return message
}