"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const res = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ ...form, action: 'register' }),
        });

        if (res.ok) {
            alert("¡Registrado! Ahora inicia sesión.");
            router.push('/Registroylogin/newlogin');
        } else {
            const error = await res.json();
            alert(error.error || "Error al registrar");
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-8 text-black">Crear Cuenta</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    type="email" 
                    placeholder="Correo Electrónico" 
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})} 
                    className="border border-gray-300 p-3 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})} 
                    className="border border-gray-300 p-3 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    required 
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold p-3 rounded transition"
                >
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
                ¿Ya tienes cuenta? 
                <Link href="/Registroylogin/newlogin" className="text-purple-600 font-bold hover:underline ml-1">
                    Inicia sesión
                </Link>
            </p>
            <p className="text-center text-gray-600 mt-2">
                <Link href="/" className="text-purple-600 hover:underline">
                    ← Volver al inicio
                </Link>
            </p>
        </>
    );
}