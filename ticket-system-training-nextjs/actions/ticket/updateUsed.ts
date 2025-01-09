"use server";

import { getServerCookie } from "@/actions/cookies/getServerCookie";

export const updateUsed = async (id: string) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/tickets/${id}/used`;
  const cookies = await getServerCookie();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  const ticketUsed = await response.json();
  return ticketUsed
}