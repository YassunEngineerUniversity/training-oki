'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { login } from '@/actions/auth/login';
import { useActionState } from 'react';
import Message from './Message';

const initialState = { message: '' };

export default function LoginForm() {
  const [state, loginAction, isPending] = useActionState(login, initialState);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>アカウントにログインしてください。</CardDescription>
        <Message loginResponse={state} />
      </CardHeader>
      <form action={loginAction}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="test@gmail.com"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">パスワード</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? 'ログイン中...' : 'ログイン'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
