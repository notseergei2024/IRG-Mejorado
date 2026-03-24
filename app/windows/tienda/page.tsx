"use client";
import Image from 'next/image';

interface Producto {
  id: number;
  titulo: string;
  precio: number;
  descripcion: string;
  imagen?: string;
}

export default function TiendaPage() {
  const productos: Producto[] = [
    { id: 1, titulo: "Laptop Pro 14", precio: 1200, descripcion: "Potencia máxima para programar.", imagen: "https://picsum.photos/seed/laptop/300/200" },
    { id: 2, titulo: "Monitor 4K", precio: 350, descripcion: "Colores vivos y negros profundos." },
    { id: 3, titulo: "Mouse Ergonómico", precio: 45, descripcion: "Cuida tu muñeca largas horas.", imagen: "https://picsum.photos/seed/mouse/300/200" },
    { id: 4, titulo: "Silla Gamer", precio: 200, descripcion: "Comodidad absoluta para tu setup." },
  ];

  const agregarAlCarrito = (prod: Producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
    const nuevoCarrito = [...carritoActual, prod];
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    alert(`${prod.titulo} añadido correctamente.`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">Nuestros Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <div key={prod.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col overflow-hidden">
            {prod.imagen ? (
              <div className="relative w-full h-40">
                <Image 
                  src={prod.imagen} 
                  alt={prod.titulo} 
                  fill 
                  className="object-cover" 
                  unoptimized // Usamos unoptimized para links externos aleatorios de picsum
                />
              </div>
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 italic text-xs text-center p-4">
                Sin imagen disponible
              </div>
            )}
            <div className="p-4 flex-grow">
              <h3 className="font-bold text-lg">{prod.titulo}</h3>
              <p className="text-gray-500 text-sm mt-1">{prod.descripcion}</p>
              <p className="text-2xl font-black text-blue-600 mt-3">${prod.precio}</p>
            </div>
            <button 
              onClick={() => agregarAlCarrito(prod)}
              className="bg-blue-600 text-white py-3 font-bold hover:bg-blue-700 transition"
            >
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}