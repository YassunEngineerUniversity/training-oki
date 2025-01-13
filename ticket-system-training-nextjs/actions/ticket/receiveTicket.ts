"use server"

import { getServerCookie } from "@/actions/cookies/getServerCookie";

export const receiveTicket = async (ticketId:string) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/tickets/${ticketId}/receive`;
  const cookies = await getServerCookie();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    credentials: 'include'
  });

  if (!response.ok) {
    const error = await response.json()
    return null;
  }

  const message = await response.json()
  return message
}