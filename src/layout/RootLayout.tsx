import { Outlet } from 'react-router-dom';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
