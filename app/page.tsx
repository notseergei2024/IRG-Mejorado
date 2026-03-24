"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">🚀 Mi Tienda Virtual</h1>
        <p className="text-xl mb-8">Bienvenido a tu tienda en línea</p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/Registroylogin/newlogin" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="/Registroylogin/register" 
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
