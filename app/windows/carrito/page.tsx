"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Producto {
  id: number;
  titulo: string;
  precio: number;
  descripcion: string;
  imagen?: string;
}

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(carritoGuardado);
    const precioTotal = carritoGuardado.reduce((sum: number, prod: Producto) => sum + prod.precio, 0);
    setTotal(precioTotal);
    setIsLoading(false);
  }, []);

  const eliminarDelCarrito = (index: number) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    const nuevoTotal = nuevoCarrito.reduce((sum, prod) => sum + prod.precio, 0);
    setTotal(nuevoTotal);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setTotal(0);
    localStorage.removeItem('carrito');
    alert('Carrito vaciado');
  };

  const realizarCompra = () => {
    alert(`¡Compra realizada! Total: $${total}`);
    vaciarCarrito();
  };

  if (isLoading) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">🛒 Tu Carrito</h2>
      
      {carrito.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl mb-4">Tu carrito está vacío</p>
          <Link 
            href="/windows/tienda" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition inline-block"
          >
            Volver a la Tienda
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 mb-8">
            {carrito.map((prod, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow p-4 flex justify-between items-center border border-gray-200"
              >
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{prod.titulo}</h3>
                  <p className="text-gray-600">{prod.descripcion}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-2xl font-bold text-blue-600">${prod.precio}</p>
                  <button 
                    onClick={() => eliminarDelCarrito(index)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-right mb-6">
              <p className="text-gray-600 text-lg mb-2">Subtotal: ${total}</p>
              <p className="text-gray-600 text-lg mb-2">Envío: $0</p>
              <h3 className="text-3xl font-bold text-blue-600">Total: ${total}</h3>
            </div>
            <div className="flex gap-4 justify-end">
              <button 
                onClick={vaciarCarrito}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded transition"
              >
                Vaciar Carrito
              </button>
              <button 
                onClick={realizarCompra}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded transition"
              >
                Comprar Ahora
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}