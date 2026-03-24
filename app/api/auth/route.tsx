import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Definimos cómo es un usuario para que TypeScript esté feliz
interface User {
    email: string;
    password?: string; // El signo ? es porque a veces solo comparamos
}

const filePath = path.join(process.cwd(), 'db.json');

export async function POST(request: Request) {
    const { email, password, action } = await request.json();
    const fileData = fs.readFileSync(filePath, 'utf8');
    const db = JSON.parse(fileData);

    if (action === 'register') {
        // Cambiamos (u: any) por (u: User)
        const userExists = db.users.find((u: User) => u.email === email);
        if (userExists) return NextResponse.json({ error: "Usuario ya existe" }, { status: 400 });

        db.users.push({ email, password });
        fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
        return NextResponse.json({ message: "Registro exitoso" });
    }

    if (action === 'login') {
        // Aquí también cambiamos (u: any) por (u: User)
        const user = db.users.find((u: User) => u.email === email && u.password === password);
        if (!user) return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
        return NextResponse.json({ message: "Login exitoso", user: { email } });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
}