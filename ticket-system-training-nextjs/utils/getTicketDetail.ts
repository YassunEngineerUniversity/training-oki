import { getServerCookie } from '@/utils/getServerCookie';

export const getTicketDetail = async (id: string) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/tickets/${id}`;
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
    return null;
  }

  const ticket = await response.json();
  return ticket;
};
