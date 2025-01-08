import { getCookie } from "@/actions/cookies/getCookie";

export const getUserByEmail = async(
  email:string
) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/users/search?email=${email}`;
  const cookies = await getCookie()
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json();
    return error
  }

  const user = await response.json();
  return user
}