"use client"

import { Button } from "@/components/ui/button";
import { NotFoundUser, User } from "@/types/user/types";
import { useEffect, useState } from "react";
import { User as UserIcon } from 'lucide-react';

interface ToUserSearchResultProps {
  result: User | NotFoundUser | null
}

const ToUserSearchResult = ({result}: ToUserSearchResultProps) => {
  const [toUserSearched, setToUserSearched] = useState(result);
  const [toUserSelected, setToUserSelected] = useState<User | null>(null)
  const [isConfirm, setIsConfirm] = useState(false)

  const handleToUserSelected = () => {
    if(!result) return
    if('message' in result) {
      setToUserSelected(null);
      return
    }

    setToUserSelected(() => ({
      id: result.id,
      name: result.name,
      email: result.email,
    }));

    setToUserSearched(null)
  }

  // 確定ボタン
  const handleConfirm = () => {
    setIsConfirm(true)
  }

  useEffect(() => {
    if(!result) return

    if('message' in result) {
      setToUserSelected(null);
      setToUserSearched(result);
      return
    }

    setToUserSearched(result)
  },[result])

  return (
    <>
      {isConfirm? (
        <div>
          確認
        </div>
      ):(
        <>
          {toUserSearched && 'email' in toUserSearched && (
            <div className="grid gap-6 mb-8 px-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold block">{toUserSearched.name}</span>
                  <span className="block text-sm">{toUserSearched.email}</span>
                </div>
                <div>
                  <Button onClick={handleToUserSelected} className="" variant="secondary">選択する</Button>
                </div>
              </div>
            </div>
          )}
          {toUserSearched && 'message' in toUserSearched && (
            <p className="text-base font-bold pl-4">ユーザが見つかりませんでした</p>
          )}
          {toUserSelected && 'email' in toUserSelected && (
          <div className="mb-2 mt-8">
            <div className="flex gap-1">
              <UserIcon/>
              <h4 className="font-bold mb-2">選択されたユーザー</h4>
            </div>
            <div className="">
              <span className="">同行者名 | </span>
              <span className="font-bold">{toUserSelected.name}</span>
            </div>
            <div className="">
              <span className="">メールアドレス | </span>
              <span className="font-bold">{toUserSelected.email}</span>
            </div>
            <div className="mt-8 mb-4 text-center">
              <Button onClick={handleConfirm} className="text-white rounded-full px-10 h-[42px] bg-[#1eb98c] border border-[#1eb98c] hover:opacity-70 hover:bg-[#1eb98c]">確定する</Button>
            </div>
          </div>
          )}
        </>
      )}
    </>
  )
}

export default ToUserSearchResult