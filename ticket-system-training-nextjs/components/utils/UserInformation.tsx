import Link from 'next/link'
import { ChevronRight } from 'lucide-react';

const UserInformation = () => {
  return (
    <div className="max-w-[560px] mx-auto mt-5">
      <div className="flex justify-between items-end">
        <div className="">
          <h2 className="text-[18px] font-bold">ユーザ名 さま</h2>
        </div>
        <div className="flex items-center gap-[2px] hover:opacity-70">
          <Link href={"/user/1"} className="text-base font-bold">会員情報</Link>
          <ChevronRight width={20}/>
        </div>
      </div>
    </div>
  )
}

export default UserInformation