import Link from 'next/link'
import { ChevronRight } from 'lucide-react';
import { User } from '@/types/user/types';

interface UserInformationProps {
  user: User
}

const UserInformation = ({user}: UserInformationProps) => {
  return (
    <div className="max-w-[560px] mx-auto mt-5">
      <div className="flex justify-between items-end">
        <div className="">
          <h2 className="text-[18px] font-bold">{user.name} さま</h2>
        </div>
        <div className="flex items-center gap-[2px] hover:opacity-70">
          <Link href={`/user/${user.id}`} className="text-base font-bold">会員情報</Link>
          <ChevronRight width={20}/>
        </div>
      </div>
    </div>
  )
}

export default UserInformation