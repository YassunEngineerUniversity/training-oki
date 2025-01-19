'use client';
import { logout } from '@/actions/auth/logout';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('ログアウトに失敗しました', error);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleLogout}
      className="justify-self-end text-[12px] font-semibold"
    >
      ログアウト
    </Button>
  );
};

export default LogoutButton;
