"use server";

import { getServerCookie } from "@/utils/getServerCookie";

export const updateBenefitUsage = async (id: string) => {
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + `/api/benefits/${id}/used`;
  const cookies = await getServerCookie();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json()
    return error;
  }

  const benefitsUsage = await response.json();
  return benefitsUsage
}