import { getServerCookie } from "@/actions/cookies/getServerCookie";

export const getTicketsMine = async (filter?:string) => {
  let endpoint = ""

  if(filter) {
    endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/tickets/mine?filter=${filter}`;
  } else {
    endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/tickets/mine';
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

  const tickets = await response.json();
  return tickets;
}