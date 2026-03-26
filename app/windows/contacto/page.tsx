"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AyudaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      router.push('/Registroylogin/newlogin');
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gradient-gaming py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black gradient-text">❓ AYUDA Y GUÍA</h1>
          <Link 
            href="/windows/tienda" 
            className="text-gaming-cyan hover:text-gaming-purple transition font-semibold"
          >
            ← Volver a mis colecciones
          </Link>
        </div>

        {/* Estructura Jerárquica */}
        <div className="card-gaming p-8 mb-8 border-gaming-purple/30">
          <h2 className="text-2xl font-bold text-gaming-purple mb-4">📚 Estructura de tu Biblioteca</h2>
          <div className="space-y-4 text-gaming-text">
            <div className="flex items-start gap-4">
              <span className="text-3xl">1️⃣</span>
              <div>
                <p className="font-bold text-gaming-cyan">Colecciones</p>
                <p className="text-gaming-muted text-sm">Agrupa tus cómics por colecciones (Marvel, DC, Independientes, etc)</p>
              </div>
            </div>
            <div className="ml-8 text-gaming-muted">↓</div>
            <div className="flex items-start gap-4 ml-8">
              <span className="text-3xl">2️⃣</span>
              <div>
                <p className="font-bold text-gaming-cyan">Cómics</p>
                <p className="text-gaming-muted text-sm">Dentro de cada colección, organiza los cómics con número, título, autor y dibujante</p>
              </div>
            </div>
            <div className="ml-8 text-gaming-muted">↓</div>
            <div className="flex items-start gap-4 ml-8">
              <span className="text-3xl">3️⃣</span>
              <div>
                <p className="font-bold text-gaming-cyan">Portadas Variantes</p>
                <p className="text-gaming-muted text-sm">Dentro de cada cómic, guarda las diferentes variantes de portada con el dibujante específico</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secciones de ayuda */}
        <div className="space-y-6">
          {/* Crear Colección */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-gaming-cyan mb-4">➕ Crear una Colección</h2>
            <ol className="text-gaming-text space-y-3 list-decimal list-inside">
              <li>En la pantalla principal, haz clic en <span className="text-gaming-green font-semibold">"➕ Nueva Colección"</span></li>
              <li>Ingresa el <span className="text-gaming-cyan">nombre</span> (ej: Marvel, DC, Independientes)</li>
              <li>Agrega una <span className="text-gaming-cyan">descripción</span> opcional (ej: "Cómics de Marvel de los 80s")</li>
              <li>Haz clic en <span className="text-gaming-green font-semibold">"💾 Crear Colección"</span></li>
            </ol>
          </div>

          {/* Crear Comic */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-gaming-cyan mb-4">📖 Agregar un Cómic a una Colección</h2>
            <ol className="text-gaming-text space-y-3 list-decimal list-inside">
              <li>Haz clic en una <span className="text-gaming-purple">colección</span> para abrirla</li>
              <li>Haz clic en <span className="text-gaming-green font-semibold">"➕ Nuevo Comic"</span></li>
              <li>Completa los campos:
                <ul className="text-gaming-muted text-sm mt-2 ml-8 space-y-1">
                  <li>📊 <span className="text-gaming-text font-semibold">Número</span> del cómic</li>
                  <li>📝 <span className="text-gaming-text font-semibold">Título</span></li>
                  <li>✍️ <span className="text-gaming-text font-semibold">Autor</span></li>
                  <li>🎨 <span className="text-gaming-text font-semibold">Dibujante</span></li>
                  <li>📅 Año (opcional)</li>
                </ul>
              </li>
              <li>(Opcional) Sube una imagen de la portada</li>
              <li>Haz clic en <span className="text-gaming-green font-semibold">"💾 Guardar Comic"</span></li>
            </ol>
          </div>

          {/* Agregar Portadas */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-gaming-cyan mb-4">🎨 Agregar Portadas Variantes</h2>
            <ol className="text-gaming-text space-y-3 list-decimal list-inside">
              <li>Dentro de una colección, haz clic en un <span className="text-gaming-cyan">cómic</span></li>
              <li>Haz clic en <span className="text-gaming-green font-semibold">"➕ Nueva Variante"</span></li>
              <li>Completa los campos:
                <ul className="text-gaming-muted text-sm mt-2 ml-8 space-y-1">
                  <li>🏷️ <span className="text-gaming-text font-semibold">Variante</span> (ej: Regular, 1:25, Second Print, Sketch)</li>
                  <li>🎨 <span className="text-gaming-text font-semibold">Dibujante</span> de esta portada específica</li>
                </ul>
              </li>
              <li>(Opcional) Sube la imagen de esta variante</li>
              <li>Haz clic en <span className="text-gaming-green font-semibold">"💾 Guardar Portada"</span></li>
            </ol>
          </div>

          {/* Campos Autor y Dibujante */}
          <div className="card-gaming p-8 border-gaming-cyan/30">
            <h2 className="text-2xl font-bold text-gaming-cyan mb-4">✍️ Autor y Dibujante</h2>
            <div className="space-y-4 text-gaming-text">
              <div>
                <p className="font-bold text-gaming-green mb-2">Cómic:</p>
                <p className="text-gaming-muted text-sm mb-2">Cada cómic tiene su propio <span className="font-semibold">autor</span> y <span className="font-semibold">dibujante</span> general</p>
              </div>
              <div>
                <p className="font-bold text-gaming-green mb-2">Portada Variante:</p>
                <p className="text-gaming-muted text-sm">Cada portada variante puede tener un <span className="font-semibold">dibujante diferente</span></p>
                <p className="text-gaming-muted text-sm mt-2">Ejemplo: Un cómic de Stan Lee dibujado por Steve Ditko puede tener una portada variante dibujada por Alex Ross</p>
              </div>
            </div>
          </div>

          {/* Eliminar */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-gaming-orange mb-4">🗑️ Eliminar Elementos</h2>
            <div className="space-y-4 text-gaming-text">
              <div>
                <p className="font-bold text-gaming-orange mb-2">Colección:</p>
                <p className="text-gaming-muted text-sm">Haz clic en el botón 🗑️ de una colección. Esto eliminará la colección Y todos sus cómics</p>
              </div>
              <div>
                <p className="font-bold text-gaming-orange mb-2">Cómic:</p>
                <p className="text-gaming-muted text-sm">Haz clic en el botón 🗑️ del cómic. Esto eliminará el cómic Y todas sus variantes</p>
              </div>
              <div>
                <p className="font-bold text-gaming-orange mb-2">Portada Variante:</p>
                <p className="text-gaming-muted text-sm">Haz clic en el botón 🗑️ de una variante. Solo se elimina esa variante, no el cómic</p>
              </div>
              <p className="text-gaming-muted text-xs mt-4">⚠️ Estas acciones no se pueden deshacer</p>
            </div>
          </div>

          {/* Imagenes */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-gaming-cyan mb-4">🖼️ Subir Imágenes</h2>
            <p className="text-gaming-text mb-4">
              Puedes subir imágenes al crear cómics y variantes de portadas.
            </p>
            <div className="bg-gaming-dark/50 p-4 rounded border border-gaming-cyan/20">
              <p className="text-gaming-text font-semibold mb-3">Recomendaciones:</p>
              <ul className="text-gaming-muted text-sm space-y-2">
                <li>📏 Dimensiones ideales: 400x600 píxeles</li>
                <li>⚖️ Peso máximo: 5MB</li>
                <li>🎨 Formatos: JPG, PNG, WEBP</li>
                <li>💾 Las imágenes se guardan en base64 dentro de localStorage</li>
              </ul>
            </div>
          </div>

          {/* Perfil */}
          <div className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-gaming-cyan mb-4">👤 Mi Perfil</h2>
            <p className="text-gaming-text mb-4">
              En tu perfil puedes ver:
            </p>
            <ul className="text-gaming-text space-y-2 list-disc list-inside">
              <li>Tu información de cuenta</li>
              <li>Total de colecciones</li>
              <li>Total de cómics en tu biblioteca</li>
              <li>Total de variantes de portadas</li>
              <li>Cantidad de imágenes subidas</li>
            </ul>
            <p className="text-gaming-muted text-sm mt-4">
              Accede al perfil desde el menú de navegación
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="card-gaming p-8 mt-8">
          <h2 className="text-2xl font-bold text-gaming-cyan mb-6">❓ Preguntas Frecuentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-gaming-green font-bold mb-2">¿Puedo tener múltiples colecciones?</h3>
              <p className="text-gaming-muted">Sí, puedes crear tantas colecciones como necesites para organizar tus cómics.</p>
            </div>
            <div>
              <h3 className="text-gaming-green font-bold mb-2">¿Qué diferencia hay entre Autor y Dibujante?</h3>
              <p className="text-gaming-muted">El <span className="text-gaming-text font-semibold">autor</span> escribe la historia, el <span className="text-gaming-text font-semibold">dibujante</span> hace los dibujos. Cada variante de portada puede tener dibujantes diferentes.</p>
            </div>
            <div>
              <h3 className="text-gaming-green font-bold mb-2">¿Dónde se guardan mis datos?</h3>
              <p className="text-gaming-muted">En el <span className="text-gaming-cyan font-semibold">localStorage del navegador</span> bajo la clave <span className="text-gaming-cyan font-mono">"colecciones"</span>. Si limpias los datos del navegador, se eliminarán.</p>
            </div>
            <div>
              <h3 className="text-gaming-green font-bold mb-2">¿Hay copia de seguridad?</h3>
              <p className="text-gaming-muted">Actualmente no. Ve a tu perfil y haz una captura de los datos si quieres una copia. La opción de exportar está en desarrollo.</p>
            </div>
            <div>
              <h3 className="text-gaming-green font-bold mb-2">¿Puedo editar después de crear?</h3>
              <p className="text-gaming-muted">No en esta versión. Puedes eliminar y crear de nuevo. La opción de editar está prevista para futuras versiones.</p>
            </div>
            <div>
              <h3 className="text-gaming-green font-bold mb-2">¿Cuántos cómics puedo guardar?</h3>
              <p className="text-gaming-muted">Depende del tamaño de las imágenes. localStorage tiene un límite de ~5-20 MB. Sin imágenes, puedes guardar miles de registros.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}