import { User } from '@/types/user/types'
import { UserIcon } from 'lucide-react'
import React from 'react'

interface UserDetailProps {
  user: User
}

const UserDetail = ({user}:UserDetailProps) => {
  return (
    <>
      <div className="flex gap-1">
        <UserIcon />
        <h4 className="font-bold mb-2">選択されたユーザー</h4>
      </div>
      <div className="">
        <span className="">同行者名 | </span>
        <span className="font-bold">{user.name}</span>
      </div>
      <div className="">
        <span className="">メールアドレス | </span>
        <span className="font-bold">{user.email}</span>
      </div>
    </>
  )
}

export default UserDetail

