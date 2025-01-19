'use client';

import { sendTicket } from '@/actions/ticket/sendTicket';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UserDetail from '@/features/ticket-view/components/UserDetail';
import { searchSchema, type SearchSchema } from '@/schema/searchSchema';
import { NotFoundUser, User } from '@/types/user/types';
import { getUserByEmail } from '@/utils/getUserByEmail';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ToUserSearchProps {
  cookie: string;
  ticketId: string;
}

const ToUserSearch = ({ cookie, ticketId }: ToUserSearchProps) => {
  const [toUserSearched, setToUserSearched] = useState<
    User | NotFoundUser | null
  >(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toUserSelected, setToUserSelected] = useState<User | null>(null);
  const router = useRouter();

  const form = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: SearchSchema) => {
    const respose = await getUserByEmail(data.email, cookie);
    setToUserSearched(respose);
  };

  const handleToUserSelected = () => {
    if (!toUserSearched) return;
    if ('message' in toUserSearched) {
      setToUserSelected(null);
      return;
    }

    setToUserSelected(() => ({
      id: toUserSearched.id,
      name: toUserSearched.name,
      email: toUserSearched.email,
    }));

    setToUserSearched(null);
  };

  const sendTicketParams = {
    ticketId: ticketId,
    toUser: toUserSelected
      ? {
          id: toUserSelected.id,
        }
      : null,
  };
  const handleSendTicket = sendTicket.bind(null, sendTicketParams);

  const handleSendButton = async () => {
    try {
      const response = await handleSendTicket();

      if (response.error) {
        setErrorMessage(response.error);
        return;
      }

      setIsComplete(true);

      setTimeout(() => {
        router.push('/?tab=sending');
      }, 1000);
    } catch (error) {}
  };

  // 確定ボタン
  const handleConfirm = () => {
    setIsConfirm(true);
  };

  useEffect(() => {
    if (!toUserSearched) return;

    if ('message' in toUserSearched) {
      setToUserSelected(null);
      setToUserSearched(toUserSearched);
      return;
    }

    setToUserSearched(toUserSearched);
  }, [toUserSearched]);

  return (
    <>
      {isConfirm ? (
        <div className="mb-8">
          {toUserSelected && 'email' in toUserSelected && (
            <div className="mb-2 mt-8">
              <UserDetail user={toUserSelected} />
              <div className="mt-8 mb-4 text-center">
                {errorMessage && (
                  <p className="text-red-500 font-bold text-2xl">
                    {errorMessage}が発生しました。
                    <br />
                    再度チケットを送り直してください。
                  </p>
                )}
                {isComplete ? (
                  <span className="font-bold text-[#1eb98c] text-2xl">
                    チケットを送りました
                  </span>
                ) : (
                  <>
                    {!errorMessage && (
                      <Button
                        onClick={handleSendButton}
                        className="text-white rounded-full px-10 h-[42px] bg-[#1eb98c] border border-[#1eb98c] hover:opacity-70 hover:bg-[#1eb98c]"
                      >
                        チケットを移行する
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
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
                        <Button
                          className="h-11 px-5 bg-red-300 hover:bg-bg-red-300 hover:opacity-80"
                          type="submit"
                        >
                          検索
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="mt-4 mb-8">
            {toUserSearched && 'email' in toUserSearched && (
              <div className="grid gap-6 mb-8 px-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold block">
                      {toUserSearched.name}
                    </span>
                    <span className="block text-sm">
                      {toUserSearched.email}
                    </span>
                  </div>
                  <div>
                    <Button
                      onClick={handleToUserSelected}
                      className=""
                      variant="secondary"
                    >
                      選択する
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {toUserSearched && 'message' in toUserSearched && (
              <p className="text-base font-bold pl-4">
                ユーザが見つかりませんでした
              </p>
            )}
            {toUserSelected && 'email' in toUserSelected && (
              <div className="mb-2 mt-8">
                <UserDetail user={toUserSelected} />
                <div className="mt-8 mb-4 text-center">
                  <Button
                    onClick={handleConfirm}
                    className="text-white rounded-full px-10 h-[42px] bg-[#1eb98c] border border-[#1eb98c] hover:opacity-70 hover:bg-[#1eb98c]"
                  >
                    確定する
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ToUserSearch;
