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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col">
      <header className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-2xl font-bold hover:opacity-80">
            🚀 Mi Tienda
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
