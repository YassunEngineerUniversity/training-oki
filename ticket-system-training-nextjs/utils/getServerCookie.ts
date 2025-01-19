import { cookies } from 'next/headers';

export const getServerCookie = async () => {
  const cookieStore = await cookies(); //サーバコンポーネントでcookieを取得
  return cookieStore.toString();
};