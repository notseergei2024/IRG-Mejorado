"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      router.push('/windows/tienda');
    } else {
      Promise.resolve().then(() => setIsLoading(false));
    }
  }, [router]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gradient-gaming flex flex-col">
      <header className="bg-gaming-dark/80 backdrop-blur border-b border-gaming-cyan/20 p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-2xl font-black gradient-text hover:opacity-80 transition">
            📚 MI COLECCIÓN DE COMICS
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}

