"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ToUserSearchResult from '@/components/tickets/ToUserSearchResult'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { searchSchema, type SearchSchema } from '@/schema/searchSchema'
import { getUserByEmail } from '@/actions/user/getUserByEmail'
import { useState } from 'react'
import { User, NotFoundUser } from '@/types/user/types'

interface ToUserSearchProps {
  cookie: string
}


const ToUserSearch = ({cookie}: ToUserSearchProps) => {
  const [toUserSearched, setToUserSearched] = useState<User | NotFoundUser | null>(null);
  const form = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: SearchSchema) => {
    const respose = await getUserByEmail(data.email, cookie)
    setToUserSearched(respose)
  }

  return (
    <>
      <h4 className="font-bold mb-3">同行者が選択してください</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="メールアドレスで検索"
                      className="h-11 focus-visible:ring-0 focus-visible:outline-red-300"
                      {...field}
                    />
                    <Button className="h-11 px-5 bg-red-300 hover:bg-bg-red-300 hover:opacity-80" type="submit">検索</Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="mt-4 mb-8">
        <ToUserSearchResult result={toUserSearched}/>
      </div>
    </>
  )
}

export default ToUserSearch