import Link from 'next/link';
import { getCurrentUser } from '@/actions/user/getCurrentUser';
import LogoutButton from './LogoutButton';

const PageHeader = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="flex items-center justify-between py-7 max-w-[560px] mx-auto">
        <Link href={"/"} className="">
          <h1 className="text-[18px] font-bold">Ticket-System-Traning-Nextjs</h1>
        </Link>
        <div className="flex items-center gap-6">
          {currentUser ? (
            <>
              <div>
                <Link
                  href={'/user/' + currentUser.id}
                  className="text-base hover:opacity-70"
                >
                  {currentUser.username}
                </Link>
              </div>
              <div>
                <LogoutButton />
              </div>
            </>
          ) : (
            <div>
              <Link href={'/login'} className="justify-self-end font-semibold">
                ログイン
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
