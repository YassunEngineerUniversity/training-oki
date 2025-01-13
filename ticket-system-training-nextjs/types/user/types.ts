export interface User {
  id: string
  name: string
  email: string
  created_at?: Date
  updated_at?: Date
}

export interface toUser {
  id: string
}

export interface NotFoundUser {
  message: string
}