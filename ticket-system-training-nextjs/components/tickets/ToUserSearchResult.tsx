"use client"

import { Button } from "@/components/ui/button";
import { NotFoundUser, User } from "@/types/user/types";
import { useEffect, useState } from "react";
import { User as UserIcon } from 'lucide-react';

interface ToUserSearchResultProps {
  result: User | NotFoundUser | null
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

const ToUserSearchResult = ({result, setIsConfirm}: ToUserSearchResultProps) => {
  const [toUserSearched, setToUserSearched] = useState(result);
  const [toUserSelected, setToUserSelected] = useState<User | null>(null)

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
     
    </>
  )
}

export default ToUserSearchResult