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
    <div className="min-h-screen bg-gradient-gaming flex items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gaming-cyan/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gaming-purple/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Logo DC */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/images/DClogo.jpg" 
            alt="DC Comics Logo" 
            className="w-40 h-auto drop-shadow-lg hover:scale-110 transition-transform duration-300"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 165, 0, 0.6))'
            }}
          />
        </div>

        <h1 className="text-6xl font-black gradient-text mb-4 drop-shadow-lg">
          MI COLECCIÓN DE COMICS
        </h1>
        <p className="text-2xl text-gaming-orange font-bold mb-2">
          🦇 DC Comics Universe 🦇
        </p>
        <p className="text-gaming-muted mb-12 text-lg">
          Gestiona tu biblioteca de cómics. Marca cuáles has comprado y cuáles aún quieres conseguir
        </p>
        
        <div className="flex gap-6 justify-center flex-wrap">
          <Link 
            href="/Registroylogin/newlogin" 
            className="btn-primary transform hover:scale-105 transition-all duration-300"
          >
            🔓 Iniciar Sesión
          </Link>
          <Link 
            href="/Registroylogin/register" 
            className="btn-secondary transform hover:scale-105 transition-all duration-300"
          >
            ⚙️ Crear Cuenta
          </Link>
        </div>
        
        <div className="mt-16 text-gaming-muted text-sm space-y-2">
          <p>✨ App para gestionar tu colección de comics</p>
          <p className="text-gaming-cyan">Colecciones • Cómics • Portadas Variantes</p>
        </div>
      </div>
    </div>
  );
}
