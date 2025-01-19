export const getUserByEmail = async (email: string, cookie: string) => {
  const endpoint =
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/users/search?email=${email}`;
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    return null;
  }

  const user = await response.json();
  return user;
};
