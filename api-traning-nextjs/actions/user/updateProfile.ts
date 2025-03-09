'use server';

import { getCookie } from '@/actions/cookies/getCookies';
import { UserProfileResponse } from '@/types/user/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const updateProfile = async (
  prevState: UserProfileResponse,
  formData: FormData,
): Promise<UserProfileResponse> => {
  const username = formData.get('username');
  const profile = formData.get('profile');
  const userId = formData.get('userId');
  const backgroundImage = formData.get('backgroundImage');

  const payload = new FormData();
  payload.append('user[username]', username as string);
  payload.append('user[profile]', profile as string);
  if (backgroundImage) {
    payload.append('user[background_image]', backgroundImage);
  }

  const endpoint =
    process.env.NEXT_PUBLIC_API_ENDPOINT + '/api/users/' + userId;
  const cookies = await getCookie();

  if (username === null || profile === null) {
    return { error: 'ユーザ名 or プロフィールが正しく入力されていないです。' };
  }

  console.log(formData);

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      Cookie: cookies,
    },
    credentials: 'include',
    body: payload
  });

  if (!response.ok) {
    const error = await response.json();
    return error;
  }

  revalidatePath(`/users/${userId}`);
  const user = await response.json();
  return user;
};
