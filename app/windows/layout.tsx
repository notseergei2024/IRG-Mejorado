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
    <div className="min-h-screen bg-gradient-gaming flex flex-col">
      {/* Header */}
      <header className="bg-gaming-dark/80 backdrop-blur border-b border-gaming-cyan/20 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/windows/tienda" className="text-3xl font-black gradient-text hover:opacity-80 transition">
            📚 MIS COMICS
          </Link>
          
          {/* User Info */}
          <div className="flex items-center gap-4">
            <span className="text-gaming-cyan font-semibold text-sm">
              👤 {user || 'Usuario'}
            </span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-gaming-orange hover:brightness-90 text-white font-bold rounded transition"
            >
              🚪 Salir
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gaming-dark/90 border-t border-gaming-cyan/20 text-gaming-muted p-6 mt-12 text-center">
        <p className="text-sm">
          © 2026 <span className="text-gaming-cyan font-bold">Mi Colección de Comics</span> • Gestiona tu biblioteca
        </p>
      </footer>
    </div>
  );
}
