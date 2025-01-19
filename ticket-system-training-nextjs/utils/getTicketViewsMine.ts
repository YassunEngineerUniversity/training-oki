import { getServerCookie } from '@/utils/getServerCookie';

export const getTicketViewsMine = async (filter?: string) => {
  let endpoint = '';

  if (filter) {
    endpoint =
      process.env.NEXT_PUBLIC_API_ENDPOINT +
      `/api/ticket_views/mine?filter=${filter}`;
  } else {
    endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/ticket_views/mine';
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
    const error = await response.json();
    return error;
  }

  const ticketViews = await response.json();
  return ticketViews;
};
