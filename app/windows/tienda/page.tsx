"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ===== INTERFACES =====
interface Portada {
  id: string;
  titulo: string;
  variante: string;
  dibujante: string;
  imagen?: string;
  fechaAgregado: string;
}

interface Comic {
  id: string;
  numero: number;
  titulo: string;
  autor: string;
  dibujante: string;
  año?: number;
  portadas: Portada[];
  fechaAgregado: string;
}

interface Coleccion {
  id: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  comics: Comic[];
  fechaCreacion: string;
}

// NIVELES DE NAVEGACIÓN
type NivelNavegacion = 'colecciones' | 'comics' | 'portadas';

export default function ComicsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [nivel, setNivel] = useState<NivelNavegacion>('colecciones');
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [coleccionActual, setColeccionActual] = useState<Coleccion | null>(null);
  const [comicActual, setComicActual] = useState<Comic | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagenColeccion: '',
    numero: '',
    titulo: '',
    autor: '',
    dibujante: '',
    año: '',
    imagenComic: '',
    variantePortada: '',
    imagenPortada: ''
  });

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      router.push('/Registroylogin/newlogin');
      return;
    }
    
    const coleccionesGuardadas = JSON.parse(localStorage.getItem('colecciones') || '[]');
    setColecciones(coleccionesGuardadas);
    setIsLoading(false);
  }, [router]);

  // ===== FUNCIONES COLECCIONES =====
  const agregarColeccion = () => {
    if (!formData.nombre.trim()) {
      alert('El nombre de la colección es obligatorio');
      return;
    }

    const nuevaColeccion: Coleccion = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      descripcion: formData.descripcion || undefined,
      imagen: formData.imagenColeccion || undefined,
      comics: [],
      fechaCreacion: new Date().toLocaleDateString('es-ES')
    };

    const nuevasColecciones = [...colecciones, nuevaColeccion];
    setColecciones(nuevasColecciones);
    localStorage.setItem('colecciones', JSON.stringify(nuevasColecciones));
    
    resetearFormulario();
    setShowForm(false);
    alert('✅ Colección creada');
  };

  const eliminarColeccion = (id: string) => {
    if (confirm('¿Eliminar colección y todos sus comics?')) {
      const nuevasColecciones = colecciones.filter(c => c.id !== id);
      setColecciones(nuevasColecciones);
      localStorage.setItem('colecciones', JSON.stringify(nuevasColecciones));
    }
  };

  // ===== FUNCIONES COMICS =====
  const agregarComic = () => {
    if (!formData.numero || !formData.titulo || !formData.autor || !formData.dibujante) {
      alert('Completa: número, título, autor y dibujante');
      return;
    }

    if (!coleccionActual) return;

    const nuevoComic: Comic = {
      id: Date.now().toString(),
      numero: parseInt(formData.numero),
      titulo: formData.titulo,
      autor: formData.autor,
      dibujante: formData.dibujante,
      año: formData.año ? parseInt(formData.año) : undefined,
      portadas: [],
      fechaAgregado: new Date().toLocaleDateString('es-ES')
    };

    const coleccionActualizada = {
      ...coleccionActual,
      comics: [...coleccionActual.comics, nuevoComic]
    };

    const coleccionesActualizadas = colecciones.map(c => 
      c.id === coleccionActual.id ? coleccionActualizada : c
    );

    setColecciones(coleccionesActualizadas);
    setColeccionActual(coleccionActualizada);
    localStorage.setItem('colecciones', JSON.stringify(coleccionesActualizadas));
    
    resetearFormulario();
    setShowForm(false);
    alert('✅ Comic agregado');
  };

  const eliminarComic = (comicId: string) => {
    if (!coleccionActual) return;

    if (confirm('¿Eliminar este comic?')) {
      const coleccionActualizada = {
        ...coleccionActual,
        comics: coleccionActual.comics.filter(c => c.id !== comicId)
      };

      const coleccionesActualizadas = colecciones.map(c => 
        c.id === coleccionActual.id ? coleccionActualizada : c
      );

      setColecciones(coleccionesActualizadas);
      setColeccionActual(coleccionActualizada);
      localStorage.setItem('colecciones', JSON.stringify(coleccionesActualizadas));
    }
  };

  // ===== FUNCIONES PORTADAS =====
  const agregarPortada = () => {
    if (!formData.variantePortada || !formData.dibujante) {
      alert('Completa: variante e dibujante de la portada');
      return;
    }

    if (!coleccionActual || !comicActual) return;

    const nuevaPortada: Portada = {
      id: Date.now().toString(),
      titulo: comicActual.titulo,
      variante: formData.variantePortada,
      dibujante: formData.dibujante,
      imagen: formData.imagenPortada || undefined,
      fechaAgregado: new Date().toLocaleDateString('es-ES')
    };

    const comicActualizado = {
      ...comicActual,
      portadas: [...comicActual.portadas, nuevaPortada]
    };

    const coleccionActualizada = {
      ...coleccionActual,
      comics: coleccionActual.comics.map(c => 
        c.id === comicActual.id ? comicActualizado : c
      )
    };

    const coleccionesActualizadas = colecciones.map(c => 
      c.id === coleccionActual.id ? coleccionActualizada : c
    );

    setColecciones(coleccionesActualizadas);
    setColeccionActual(coleccionActualizada);
    setComicActual(comicActualizado);
    localStorage.setItem('colecciones', JSON.stringify(coleccionesActualizadas));
    
    resetearFormulario();
    setShowForm(false);
    alert('✅ Portada agregada');
  };

  const eliminarPortada = (portadaId: string) => {
    if (!coleccionActual || !comicActual) return;

    if (confirm('¿Eliminar esta variante?')) {
      const comicActualizado = {
        ...comicActual,
        portadas: comicActual.portadas.filter(p => p.id !== portadaId)
      };

      const coleccionActualizada = {
        ...coleccionActual,
        comics: coleccionActual.comics.map(c => 
          c.id === comicActual.id ? comicActualizado : c
        )
      };

      const coleccionesActualizadas = colecciones.map(c => 
        c.id === coleccionActual.id ? coleccionActualizada : c
      );

      setColecciones(coleccionesActualizadas);
      setColeccionActual(coleccionActualizada);
      setComicActual(comicActualizado);
      localStorage.setItem('colecciones', JSON.stringify(coleccionesActualizadas));
    }
  };

  // ===== FUNCIONES UTILIDAD =====
  const resetearFormulario = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      imagenColeccion: '',
      numero: '',
      titulo: '',
      autor: '',
      dibujante: '',
      año: '',
      imagenComic: '',
      variantePortada: '',
      imagenPortada: ''
    });
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>, campo: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          [campo]: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const irAlDetalle = (coleccion: Coleccion) => {
    setColeccionActual(coleccion);
    setNivel('comics');
  };

  const irAPortadas = (comic: Comic) => {
    setComicActual(comic);
    setNivel('portadas');
  };

  const volverAtras = () => {
    if (nivel === 'portadas') {
      setNivel('comics');
      setComicActual(null);
    } else if (nivel === 'comics') {
      setNivel('colecciones');
      setColeccionActual(null);
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gradient-gaming py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black gradient-text">📚 MI COLECCIÓN DE COMICS</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/');
              }}
              className="px-6 py-3 bg-gaming-orange text-white font-bold rounded-lg hover:brightness-90 transition"
            >
              🚪 Salir
            </button>
          </div>
        </div>

        {/* Botones de Navegación */}
        {nivel !== 'colecciones' && (
          <div className="flex gap-4 mb-8">
            <button 
              onClick={volverAtras}
              className="btn-primary"
            >
              ← Atrás
            </button>
          </div>
        )}

        {/* ===== NIVEL 1: COLECCIONES ===== */}
        {nivel === 'colecciones' && (
          <>
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setShowForm(!showForm)}
                className="btn-primary"
              >
                {showForm ? '✖️ Cancelar' : '➕ Nueva Colección'}
              </button>
            </div>

            {showForm && (
              <div className="card-gaming p-8 mb-8">
                <h2 className="text-2xl font-bold text-gaming-cyan mb-6">Crear Colección</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="text"
                    placeholder="Nombre de la colección"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="input-gaming"
                  />
                  <textarea 
                    placeholder="Descripción (opcional)"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="input-gaming md:col-span-2 h-24 resize-none"
                  />
                  <div className="md:col-span-2">
                    <label className="block text-gaming-cyan font-semibold mb-2">Imagen de portada (opcional)</label>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImagenChange(e, 'imagenColeccion')}
                      className="w-full px-4 py-2 bg-gaming-dark border border-gaming-cyan/30 rounded-lg text-gaming-text cursor-pointer"
                    />
                  </div>
                  {formData.imagenColeccion && (
                    <div className="md:col-span-2">
                      <p className="text-gaming-cyan font-semibold mb-2">Vista previa:</p>
                      <img 
                        src={formData.imagenColeccion} 
                        alt="Preview" 
                        className="w-32 h-48 object-cover rounded-lg border border-gaming-cyan/30"
                      />
                    </div>
                  )}
                  <button 
                    onClick={agregarColeccion}
                    className="btn-primary md:col-span-2 py-3"
                  >
                    💾 Crear Colección
                  </button>
                </div>
              </div>
            )}

            {colecciones.length === 0 ? (
              <div className="card-gaming p-12 text-center">
                <p className="text-4xl mb-4">📚</p>
                <p className="text-gaming-muted text-lg mb-6">No tienes colecciones aún</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn-primary inline-block"
                >
                  ➕ Crear colección
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {colecciones.map((col) => (
                  <div 
                    key={col.id} 
                    className="card-gaming overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer flex flex-col h-full"
                    onClick={() => irAlDetalle(col)}
                  >
                    {/* Imagen de colección */}
                    <div className="relative w-full h-64 overflow-hidden bg-gaming-dark/50 flex-shrink-0">
                      {col.imagen ? (
                        <img 
                          src={col.imagen} 
                          alt={col.nombre} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          📚
                        </div>
                      )}
                    </div>

                    {/* Información */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gaming-text mb-2">{col.nombre}</h3>
                        {col.descripcion && (
                          <p className="text-gaming-muted text-sm mb-4 line-clamp-2">{col.descripcion}</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <p className="text-gaming-cyan font-semibold">{col.comics.length} 📖</p>
                        <p className="text-gaming-muted text-xs">📅 {col.fechaCreacion}</p>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gaming-cyan/20 flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarColeccion(col.id);
                        }}
                        className="flex-1 px-3 py-2 bg-gaming-orange/20 text-gaming-orange hover:bg-gaming-orange/30 rounded font-bold transition"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ===== NIVEL 2: COMICS EN COLECCIÓN ===== */}
        {nivel === 'comics' && coleccionActual && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gaming-cyan mb-2">{coleccionActual.nombre}</h2>
              {coleccionActual.descripcion && (
                <p className="text-gaming-muted">{coleccionActual.descripcion}</p>
              )}
              <p className="text-gaming-muted text-sm mt-2">{coleccionActual.comics.length} comics en esta colección</p>
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setShowForm(!showForm)}
                className="btn-primary"
              >
                {showForm ? '✖️ Cancelar' : '➕ Nuevo Comic'}
              </button>
            </div>

            {showForm && (
              <div className="card-gaming p-8 mb-8">
                <h2 className="text-2xl font-bold text-gaming-cyan mb-6">Agregar Comic</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="number"
                    placeholder="Número del comic"
                    value={formData.numero}
                    onChange={(e) => setFormData({...formData, numero: e.target.value})}
                    className="input-gaming"
                  />
                  <input 
                    type="text"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    className="input-gaming"
                  />
                  <input 
                    type="text"
                    placeholder="Autor"
                    value={formData.autor}
                    onChange={(e) => setFormData({...formData, autor: e.target.value})}
                    className="input-gaming"
                  />
                  <input 
                    type="text"
                    placeholder="Dibujante"
                    value={formData.dibujante}
                    onChange={(e) => setFormData({...formData, dibujante: e.target.value})}
                    className="input-gaming"
                  />
                  <input 
                    type="number"
                    placeholder="Año (opcional)"
                    value={formData.año}
                    onChange={(e) => setFormData({...formData, año: e.target.value})}
                    className="input-gaming"
                  />
                  <div className="md:col-span-2">
                    <label className="block text-gaming-cyan font-semibold mb-2">Imagen (opcional)</label>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImagenChange(e, 'imagenComic')}
                      className="w-full px-4 py-2 bg-gaming-dark border border-gaming-cyan/30 rounded-lg text-gaming-text cursor-pointer"
                    />
                  </div>
                  {formData.imagenComic && (
                    <div className="md:col-span-2">
                      <p className="text-gaming-cyan font-semibold mb-2">Vista previa:</p>
                      <img 
                        src={formData.imagenComic} 
                        alt="Preview" 
                        className="w-32 h-48 object-cover rounded-lg border border-gaming-cyan/30"
                      />
                    </div>
                  )}
                  <button 
                    onClick={agregarComic}
                    className="btn-primary md:col-span-2 py-3"
                  >
                    💾 Guardar Comic
                  </button>
                </div>
              </div>
            )}

            {coleccionActual.comics.length === 0 ? (
              <div className="card-gaming p-12 text-center">
                <p className="text-4xl mb-4">📖</p>
                <p className="text-gaming-muted text-lg mb-6">Esta colección está vacía</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn-primary inline-block"
                >
                  ➕ Agregar comic
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {coleccionActual.comics.map((comic) => (
                  <div 
                    key={comic.id} 
                    className="card-gaming overflow-hidden hover:scale-105 transform transition-all duration-300 cursor-pointer flex flex-col h-full"
                    onClick={() => irAPortadas(comic)}
                  >
                    {/* Imagen del comic */}
                    <div className="relative w-full h-64 overflow-hidden bg-gaming-dark/50 flex-shrink-0">
                      {comic.imagen ? (
                        <img 
                          src={comic.imagen} 
                          alt={comic.titulo} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          📖
                        </div>
                      )}
                    </div>

                    {/* Información del comic */}
                    <div className="p-5 flex flex-col flex-grow">
                      <p className="text-gaming-cyan font-bold mb-2">#{comic.numero}</p>
                      <h3 className="font-bold text-base text-gaming-text mb-2 line-clamp-2">{comic.titulo}</h3>
                      <p className="text-gaming-muted text-sm mb-1">✍️ {comic.autor}</p>
                      <p className="text-gaming-muted text-sm mb-2">🎨 {comic.dibujante}</p>
                      {comic.año && (
                        <p className="text-gaming-muted text-sm mb-2">📅 {comic.año}</p>
                      )}
                      <p className="text-gaming-purple text-sm mt-auto mb-4 font-semibold">🖼️ {comic.portadas.length} variantes</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarComic(comic.id);
                        }}
                        className="px-3 py-2 bg-gaming-orange/20 text-gaming-orange hover:bg-gaming-orange/30 rounded text-sm font-bold transition"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ===== NIVEL 3: PORTADAS EN COMIC ===== */}
        {nivel === 'portadas' && comicActual && coleccionActual && (
          <>
            <div className="mb-8">
              <p className="text-gaming-purple mb-2">📚 {coleccionActual.nombre}</p>
              <h2 className="text-3xl font-bold text-gaming-cyan mb-4">
                Comic #{comicActual.numero}: {comicActual.titulo}
              </h2>
              <div className="flex gap-8 text-gaming-muted">
                <div>Autor: <span className="text-gaming-text font-semibold">{comicActual.autor}</span></div>
                <div>Dibujante: <span className="text-gaming-text font-semibold">{comicActual.dibujante}</span></div>
                {comicActual.año && <div>Año: <span className="text-gaming-text font-semibold">{comicActual.año}</span></div>}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setShowForm(!showForm)}
                className="btn-primary"
              >
                {showForm ? '✖️ Cancelar' : '➕ Nueva Variante'}
              </button>
            </div>

            {showForm && (
              <div className="card-gaming p-8 mb-8">
                <h2 className="text-2xl font-bold text-gaming-cyan mb-6">Agregar Portada Variante</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <input 
                    type="text"
                    placeholder="Variante (ej: Portada Regular, 1:25, etc)"
                    value={formData.variantePortada}
                    onChange={(e) => setFormData({...formData, variantePortada: e.target.value})}
                    className="input-gaming"
                  />
                  <input 
                    type="text"
                    placeholder="Dibujante de esta portada"
                    value={formData.dibujante}
                    onChange={(e) => setFormData({...formData, dibujante: e.target.value})}
                    className="input-gaming"
                  />
                  <div className="md:col-span-2">
                    <label className="block text-gaming-cyan font-semibold mb-2">Imagen (opcional)</label>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImagenChange(e, 'imagenPortada')}
                      className="w-full px-4 py-2 bg-gaming-dark border border-gaming-cyan/30 rounded-lg text-gaming-text cursor-pointer"
                    />
                  </div>
                  {formData.imagenPortada && (
                    <div className="md:col-span-2">
                      <p className="text-gaming-cyan font-semibold mb-2">Vista previa:</p>
                      <img 
                        src={formData.imagenPortada} 
                        alt="Preview" 
                        className="w-32 h-48 object-cover rounded-lg border border-gaming-cyan/30"
                      />
                    </div>
                  )}
                  <button 
                    onClick={agregarPortada}
                    className="btn-primary md:col-span-2 py-3"
                  >
                    💾 Guardar Portada
                  </button>
                </div>
              </div>
            )}

            {comicActual.portadas.length === 0 ? (
              <div className="card-gaming p-12 text-center">
                <p className="text-4xl mb-4">🎨</p>
                <p className="text-gaming-muted text-lg mb-6">Sin variantes aún</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn-primary inline-block"
                >
                  ➕ Agregar portada
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {comicActual.portadas.map((portada) => (
                  <div 
                    key={portada.id} 
                    className="card-gaming overflow-hidden hover:scale-105 transform transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative w-full h-64 overflow-hidden bg-gaming-dark/50 flex-shrink-0">
                      {portada.imagen ? (
                        <img 
                          src={portada.imagen} 
                          alt={portada.variante} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          🎨
                        </div>
                      )}
                      {/* ID de la portada */}
                      <div className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold bg-gaming-purple/80 text-white">
                        #{portada.id.slice(-6)}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <p className="font-bold text-gaming-cyan mb-2 text-base">{portada.variante}</p>
                      <div className="bg-gaming-dark/50 p-3 rounded mb-3 border-l-2 border-gaming-green">
                        <p className="text-gaming-muted text-xs">🎨 Dibujante</p>
                        <p className="text-gaming-text font-semibold text-sm">{portada.dibujante}</p>
                      </div>
                      <p className="text-gaming-muted text-xs mb-4">📅 {portada.fechaAgregado}</p>

                      <button 
                        onClick={() => eliminarPortada(portada.id)}
                        className="mt-auto px-3 py-2 bg-gaming-orange/20 text-gaming-orange hover:bg-gaming-orange/30 rounded text-sm font-bold transition"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}