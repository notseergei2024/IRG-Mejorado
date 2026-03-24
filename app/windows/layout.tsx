"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WindowsLayout({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      router.push('/Registroylogin/newlogin');
    } else {
      Promise.resolve().then(() => {
        setUser(loggedUser);
        setIsLoading(false);
      });
    }
  }, [router]);

  if (isLoading) return null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-black">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/windows/tienda" className="text-2xl font-bold hover:opacity-80">
             Mi Tienda
          </Link>
          <nav className="flex gap-6 items-center">
            <Link 
              href="/windows/tienda" 
              className="hover:text-blue-200 transition font-semibold"
            >
              Tienda
            </Link>
            <Link 
              href="/windows/carrito" 
              className="hover:text-blue-200 transition font-semibold"
            >
               Carrito
            </Link>
            <Link 
              href="/windows/contacto" 
              className="hover:text-blue-200 transition font-semibold"
            >
               Contacto
            </Link>
            <span className="text-sm border-l pl-6 border-blue-400">
               {user || 'Usuario'}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition font-semibold"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2026 Mi Tienda Virtual. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
