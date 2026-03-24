"use client";
import { useState } from 'react';

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
    alert('¡Mensaje enviado! Nos pondremos en contacto pronto.');
    setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">✉️ Contáctanos</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Envíanos un mensaje</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
            <input 
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Asunto</label>
            <input 
              type="text"
              name="asunto"
              value={form.asunto}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
            <textarea 
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
          >
            Enviar Mensaje
          </button>

          {enviado && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded text-green-700">
              ✓ Mensaje enviado correctamente
            </div>
          )}
        </form>

        {/* Información de contacto */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">📍 Ubicación</h3>
            <p className="text-gray-600">
              Calle Principal 123<br/>
              Madrid, España
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">📞 Teléfono</h3>
            <p className="text-gray-600">
              +34 123 456 789<br/>
              WhatsApp: +34 600 000 000
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">⏰ Horario</h3>
            <p className="text-gray-600">
              Lunes a Viernes: 9:00 - 18:00<br/>
              Sábados: 10:00 - 14:00<br/>
              Domingos: Cerrado
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-bold mb-2 text-blue-900">💬 Email</h3>
            <p className="text-blue-700">
              soporte@mitienda.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}