export interface User {
  id: string;
  username: string;
  profile: string;
  background_image: string;
  created_at: string;
  updated_at: string;
}

export interface UserError {
  error: string;
}

export type UserProfileResponse = User | UserError;
