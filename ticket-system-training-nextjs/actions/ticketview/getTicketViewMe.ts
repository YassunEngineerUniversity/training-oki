import { getServerCookie } from "@/actions/cookies/getServerCookie";

export const getTicketViewMe = async (id: string) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/ticket_views/${id}/me`;
  const cookies = await getServerCookie();

  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }

  const ticketViews = await response.json();
  return ticketViews;
}