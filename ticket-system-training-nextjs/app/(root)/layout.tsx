import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import '../globals.css';
import PageHeader from '@/components/header/PageHeader';

const noto = Noto_Sans_JP({
  weight: ['400', '700'],
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rails API and Next.js',
  description: 'Create Rails API and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={noto.className}>
      <PageHeader />
        <main className="">
          <div className="">{children}</div>
        </main>
      </body>
    </html>
  );
}
