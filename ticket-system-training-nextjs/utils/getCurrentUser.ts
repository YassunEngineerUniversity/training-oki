import { cookies } from 'next/headers';

export const getCurrentUser = async () => {
  const cookieStore = await cookies(); //サーバコンポーネントでcookieを取得
  const session = cookieStore.get('_ticket_system_training_session');
  if (!session) return null;

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/users/me';
  const response = await fetch(endpoint, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  const responseData = await response.json();
  return responseData;
};
