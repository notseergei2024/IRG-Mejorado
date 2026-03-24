"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const res = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ ...form, action: 'login' }),
        });

        if (res.ok) {
            localStorage.setItem('user', form.email);
            router.push('/windows/tienda');
        } else {
            alert("Usuario o contraseña incorrectos");
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-8 text-black">Iniciar Sesión</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input 
                    type="email" 
                    placeholder="Correo Electrónico" 
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})} 
                    className="border border-gray-300 p-3 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})} 
                    className="border border-gray-300 p-3 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    required 
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold p-3 rounded transition"
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <p className="text-center text-gray-600 mt-4">
                ¿No tienes cuenta? 
                <Link href="/Registroylogin/register" className="text-blue-600 font-bold hover:underline ml-1">
                    Regístrate aquí
                </Link>
            </p>
            <p className="text-center text-gray-600 mt-2">
                <Link href="/" className="text-blue-600 hover:underline">
                    ← Volver al inicio
                </Link>
            </p>
        </>
    );
}
