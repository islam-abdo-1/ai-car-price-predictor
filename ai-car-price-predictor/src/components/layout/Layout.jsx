import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '../ui/Navbar';
import { Footer } from '../ui/Footer';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}