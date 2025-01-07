import { getCookie } from "@/actions/cookies/getCookie";

export const getTicketViewsMine = async () => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/ticket_views/mine';
  const cookies = await getCookie();

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