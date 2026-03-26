"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Coleccion {
  id: string;
  nombre: string;
  descripcion?: string;
  comics: any[];
  fechaCreacion: string;
}

export default function PerfilPage() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    colecciones: 0,
    totalComics: 0,
    totalVariantes: 0,
    comicsConImagen: 0
  });
  const router = useRouter();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      router.push('/Registroylogin/newlogin');
      return;
    }
    
    setUser(loggedUser);
    
    const colecciones: Coleccion[] = JSON.parse(localStorage.getItem('colecciones') || '[]');
    
    let totalComics = 0;
    let totalVariantes = 0;
    let comicsConImagen = 0;

    colecciones.forEach(col => {
      col.comics.forEach(comic => {
        totalComics++;
        totalVariantes += comic.portadas?.length || 0;
        if (comic.imagen) comicsConImagen++;
        comic.portadas?.forEach((p: any) => {
          if (p.imagen) comicsConImagen++;
        });
      });
    });

    setStats({
      colecciones: colecciones.length,
      totalComics,
      totalVariantes,
      comicsConImagen
    });
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) return null;

  const limpiarDatos = () => {
    if (confirm('¿Estás seguro de que quieres eliminar TODAS las colecciones y comics? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('colecciones');
      setStats({
        colecciones: 0,
        totalComics: 0,
        totalVariantes: 0,
        comicsConImagen: 0
      });
      alert('✅ Todos los datos han sido eliminados');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-gaming py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black gradient-text mb-4">👤 MI PERFIL</h1>
          <Link 
            href="/windows/tienda" 
            className="text-gaming-cyan hover:text-gaming-purple transition font-semibold"
          >
            ← Volver a mis colecciones
          </Link>
        </div>

        {/* Información del usuario */}
        <div className="card-gaming p-8 mb-8">
          <h2 className="text-2xl font-bold text-gaming-cyan mb-6">Información de la Cuenta</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gaming-muted text-sm">Email/Usuario:</p>
              <p className="text-gaming-text text-lg font-semibold">{user}</p>
            </div>
            <div>
              <p className="text-gaming-muted text-sm">Cuenta creada:</p>
              <p className="text-gaming-text text-lg font-semibold">2026</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="card-gaming p-8 mb-8">
          <h2 className="text-2xl font-bold text-gaming-cyan mb-6">📊 Estadísticas de tu Biblioteca</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gaming-dark/50 p-4 rounded-lg border border-gaming-purple/30">
              <p className="text-gaming-muted text-sm mb-2">Colecciones</p>
              <p className="text-4xl font-black text-gaming-purple">{stats.colecciones}</p>
            </div>
            <div className="bg-gaming-dark/50 p-4 rounded-lg border border-gaming-cyan/30">
              <p className="text-gaming-muted text-sm mb-2">Cómics</p>
              <p className="text-4xl font-black text-gaming-cyan">{stats.totalComics}</p>
            </div>
            <div className="bg-gaming-dark/50 p-4 rounded-lg border border-gaming-green/30">
              <p className="text-gaming-muted text-sm mb-2">Variantes</p>
              <p className="text-4xl font-black text-gaming-green">{stats.totalVariantes}</p>
            </div>
            <div className="bg-gaming-dark/50 p-4 rounded-lg border border-gaming-pink/30">
              <p className="text-gaming-muted text-sm mb-2">Con imagen</p>
              <p className="text-4xl font-black text-gaming-pink">{stats.comicsConImagen}</p>
            </div>
          </div>
        </div>

        {/* Información al usuario */}
        <div className="card-gaming p-8 mb-8 border-gaming-cyan/30">
          <h2 className="text-xl font-bold text-gaming-cyan mb-4">💾 Dónde se guardan tus datos</h2>
          <div className="space-y-4 text-gaming-muted text-sm">
            <p>
              📍 <span className="text-gaming-text font-semibold">localStorage del navegador</span>
            </p>
            <p>
              🔑 Clave: <span className="text-gaming-cyan font-mono">colecciones</span>
            </p>
            <div className="bg-gaming-dark/50 p-4 rounded border border-gaming-cyan/20 mt-4">
              <p className="text-gaming-text mb-2">Estructura guardada:</p>
              <pre className="text-xs overflow-auto max-h-32 text-gaming-purple">
{`localStorage["colecciones"] = [
  {
    id, nombre, descripcion,
    comics: [
      {
        id, numero, titulo, autor,
        dibujante, año,
        portadas: [...]
      }
    ]
  }
]`}
              </pre>
            </div>
            <p className="mt-4">
              ⚠️ Los datos se pierden si limpias el caché del navegador
            </p>
          </div>
        </div>

        {/* Acciones peligrosas */}
        <div className="card-gaming p-8 border-gaming-orange/50">
          <h2 className="text-2xl font-bold text-gaming-orange mb-6">🚨 Zona de Peligro</h2>
          <button 
            onClick={limpiarDatos}
            className="w-full px-6 py-3 bg-gaming-orange/20 text-gaming-orange hover:bg-gaming-orange/30 font-bold rounded-lg transition"
          >
            🗑️ Eliminar todas las colecciones
          </button>
          <p className="text-gaming-muted text-sm mt-3">
            ⚠️ Esta acción eliminará permanentemente todas tus colecciones, cómics y variantes. No se puede deshacer.
          </p>
        </div>
      </div>
    </div>
  );
}