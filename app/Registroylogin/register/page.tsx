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
        <div className="min-h-screen bg-gradient-gaming flex items-center justify-center px-4 relative overflow-hidden">
            {/* Efectos de fondo */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-gaming-orange/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-gaming-purple/20 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="card-gaming p-8">
                    {/* Logo DC */}
                    <div className="mb-8 flex justify-center">
                        <img 
                            src="/images/DClogo.jpg" 
                            alt="DC Comics Logo" 
                            className="w-32 h-auto drop-shadow-lg hover:scale-110 transition-transform duration-300"
                            style={{
                                filter: 'drop-shadow(0 0 15px rgba(255, 165, 0, 0.6))'
                            }}
                        />
                    </div>

                    <h1 className="text-3xl font-black gradient-text mb-2 text-center">
                        CREAR CUENTA
                    </h1>
                    <p className="text-gaming-muted text-center mb-8 text-sm">
                        Únete a la comunidad de coleccionistas
                    </p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input 
                            type="email" 
                            placeholder="Correo Electrónico" 
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})} 
                            className="input-gaming" 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={form.password}
                            onChange={e => setForm({...form, password: e.target.value})} 
                            className="input-gaming" 
                            required 
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-secondary w-full disabled:opacity-50 transform hover:scale-105 transition-all duration-300"
                        >
                            {loading ? '⏳ Registrando...' : '📚 Registrarse'}
                        </button>
                    </form>
                    
                    <p className="text-center text-gaming-muted mt-6 text-sm">
                        ¿Ya tienes cuenta? 
                        <Link href="/Registroylogin/newlogin" className="text-gaming-green font-bold hover:text-gaming-cyan ml-2 transition">
                            Inicia sesión
                        </Link>
                    </p>
                    <p className="text-center text-gaming-muted mt-3 text-sm">
                        <Link href="/" className="text-gaming-cyan hover:text-gaming-purple transition">
                            ← Volver al inicio
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}