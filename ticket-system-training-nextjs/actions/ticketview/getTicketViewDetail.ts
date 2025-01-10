import { getServerCookie } from "@/actions/cookies/getServerCookie";

export const getTicketViewDetail = async (
  id: string,
  filter?: string
) => {
  let endpoint = ""
  
  switch (filter) {
    case "sending":
      endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/ticket_views/${id}?filter=${filter}`;
      break;
    default:
      endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/ticket_views/${id}`;
      break;
  }

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