import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Mulish } from '@next/font/google';

// import 'reset-css';
import '@/styles/globals.scss';

const mulish = Mulish({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <main className={mulish.className}>
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}
