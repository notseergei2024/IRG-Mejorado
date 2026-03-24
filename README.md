# 🚀 Mi Tienda Virtual

Una aplicación de comercio electrónico moderna construida con **Next.js 16**, **React 19** y **Tailwind CSS**. Sistema completo de autenticación, carrito de compras y contacto.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas y Navegación](#rutas-y-navegación)
- [Autenticación](#autenticación)
- [Funcionalidades](#funcionalidades)
- [Scripts Disponibles](#scripts-disponibles)
- [Tecnologías](#tecnologías)

## ✨ Características

✅ **Autenticación de Usuarios**
- Registro de nuevos usuarios
- Login seguro con validación
- Persistencia de sesión en localStorage
- Logout automático

✅ **Tienda de Productos**
- Catálogo de productos dinámico
- Imágenes de productos
- Precios y descripciones
- Agregar productos al carrito

✅ **Carrito de Compras**
- Ver productos agregados
- Eliminar productos del carrito
- Calcular total automáticamente
- Procesar compras
- Vaciar carrito

✅ **Página de Contacto**
- Formulario de contacto completo
- Información de ubicación
- Teléfono y horarios
- Correo de contacto

✅ **Diseño Responsivo**
- Interfaz moderna con Tailwind CSS
- Componentes visuales atractivos
- Diseño mobile-first

## 📦 Requisitos Previos

- **Node.js** >= 18.x
- **npm** o **yarn**
- **Git** (opcional)

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd irg
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

### 4. Abrir en el navegador
Accede a [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
irg/
├── app/
│   ├── layout.tsx                 # Layout raíz (HTML, meta tags)
│   ├── page.tsx                   # Página de inicio
│   ├── globals.css                # Estilos globales
│   │
│   ├── api/
│   │   └── auth/
│   │       └── route.tsx          # Endpoint de autenticación
│   │
│   ├── Registroylogin/
│   │   ├── layout.tsx             # Layout para login/register
│   │   ├── newlogin/
│   │   │   └── page.tsx           # Página de login
│   │   └── register/
│   │       └── page.tsx           # Página de registro
│   │
│   └── windows/
│       ├── layout.tsx             # Layout con navegación
│       ├── tienda/
│       │   └── page.tsx           # Catálogo de productos
│       ├── carrito/
│       │   └── page.tsx           # Carrito de compras
│       └── contacto/
│           └── page.tsx           # Página de contacto
│
├── public/                        # Archivos estáticos
├── package.json                   # Dependencias del proyecto
├── tsconfig.json                  # Configuración TypeScript
├── next.config.ts                 # Configuración de Next.js
├── tailwind.config.js             # Configuración de Tailwind
├── postcss.config.mjs             # Configuración de PostCSS
└── db.json                        # Base de datos simulada

```

## 🗺️ Rutas y Navegación

### Rutas Públicas (Sin autenticación)

| Ruta | Descripción |
|------|-------------|
| `/` | Home - Pantalla de bienvenida con opciones de Login/Register |
| `/Registroylogin/newlogin` | Página de inicio de sesión |
| `/Registroylogin/register` | Página de registro |

### Rutas Protegidas (Requieren autenticación)

| Ruta | Descripción |
|------|-------------|
| `/windows/tienda` | Catálogo de productos |
| `/windows/carrito` | Carrito de compras |
| `/windows/contacto` | Página de contacto |

### Sistema de Layouts

```
Layout Raíz (app/layout.tsx)
├── Rutas públicas → Layout de Autenticación
├── Rutas protegidas → Layout de Windows (con navegación)
```

## 🔐 Autenticación

### Flujo de Authentication

1. **Usuario accede a `/`**
   - Si está autenticado → Redirige a `/windows/tienda`
   - Si no → Muestra opciones de Login/Register

2. **En `/Registroylogin/newlogin` (Login)**
   - Valida credenciales contra `db.json`
   - Si es correcto → Guarda email en localStorage
   - Redirige a `/windows/tienda`

3. **En `/Registroylogin/register` (Registro)**
   - Valida que email no exista
   - Crea nuevo usuario en `db.json`
   - Redirige a login

4. **En rutas protegidas (`/windows/*`)**
   - Verifica si hay usuario en localStorage
   - Si no existe → Redirige a login
   - Si existe → Muestra contenido protegido

### Datos almacenados

- **localStorage**: Email del usuario actual (`key: 'user'`)
- **localStorage**: Carrito de compras (`key: 'carrito'`)
- **db.json**: Base de datos de usuarios registrados

## 🎯 Funcionalidades Detalladas

### 1. **Sistema de Autenticación (`/api/auth`)**

**Endpoint:** `POST /api/auth`

Parámetros:
```json
{
  "email": "usuario@example.com",
  "password": "contraseña",
  "action": "login" | "register"
}
```

**Respuestas:**
- Login exitoso: `{ message: "Login exitoso", user: { email } }`
- Registro exitoso: `{ message: "Registro exitoso" }`
- Error: `{ error: "Descripción del error" }`

### 2. **Página de Inicio**

- Muestra banner principal
- Botones para Login y Registro
- Redirecciona automáticamente si ya está autenticado

### 3. **Tienda de Productos**

- Lista de 4 productos de ejemplo:
  - Laptop Pro 14 ($1200)
  - Monitor 4K ($350)
  - Mouse Ergonómico ($45)
  - Silla Gamer ($200)

- Funcionalidades:
  - Ver productos con imagen y descripción
  - Agregar al carrito con 1 clic
  - Confirmación visual de agregado

### 4. **Carrito de Compras**

- Muestra todos los productos agregados
- Vi aligual
sto total automático
- Eliminar productos individuales
- Vaciar todo el carrito
- Procesar compra (limpia el carrito)

### 5. **Formulario de Contacto**

Campos:
- Nombre (requerido)
- Email (requerido)
- Asunto (requerido)
- Mensaje (requerido)

Información adicional:
- 📍 Ubicación
- 📞 Teléfono y WhatsApp
- ⏰ Horarios de atención
- 💬 Email de contacto

### 6. **Navegación Principal**

Disponible en todas las rutas `/windows/*`:

```
┌─────────────────────────────────────┐
│  🚀 Mi Tienda │ Tienda | 🛒 Carrito | ✉️ Contacto │ 👤 Usuario | Logout │
└─────────────────────────────────────┘
```

## 📜 Scripts Disponibles

```bash
# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar aplicación en producción
npm start

# Ejecutar linter
npm run lint

# Ejecutar servidor JSON (opcional)
npm run json-server
```

## 🛠️ Tecnologías

### Frontend
- **Next.js** 16.2.0 - Framework React
- **React** 19.2.4 - Librería UI
- **React DOM** 19.2.4 - Renderizado DOM
- **Tailwind CSS** 4 - Estilos CSS
- **TypeScript** 5 - Tipado de JavaScript

### Backend (API)
- **Next.js API Routes** - Servidor backend
- **Node.js fs** - Lectura/escritura de archivos

### Herramientas de Desarrollo
- **ESLint** 9 - Linter de código
- **TypeScript** 5 - Lenguaje tipado
- **PostCSS** 4 - Post-procesador CSS

## 🚀 Despliegue

### Preparar para producción

1. **Instalar dependencias (si se borraron)**
   ```bash
   npm install
   ```

2. **Construir la aplicación**
   ```bash
   npm run build
   ```

3. **Ejecutar en modo producción**
   ```bash
   npm start
   ```

4. **Acceder a la aplicación**
   ```
   http://localhost:3000
   ```

### Archivos a incluir en control de versiones

```
✅ Incluir:
- app/
- public/
- package.json
- next.config.ts
- tsconfig.json
- tailwind.config.js
- postcss.config.mjs

❌ Excluir (agregar a .gitignore):
- node_modules/
- .next/
- .env.local
- out/
```

## 📝 Notas Importantes

### Seguridad
- Las contraseñas se almacenan en `db.json` sin encriptar (solo para desarrollo)
- En producción, usar bcrypt o similar para hasear contraseñas
- Implementar JWT para autenticación más segura

### LocalStorage
- Almacena datos en el navegador del cliente
- Se pierde al limpiar historial del navegador
- Para persistencia real, usar base de datos

### Escalabilidad Futura
- Migrar `db.json` a una base de datos real (MongoDB, PostgreSQL)
- Implementar autenticación con JWT
- Agregar validación de email
- Implementar pago real (Stripe, PayPal)
- Agregar búsqueda y filtros de productos
- Sistema de comentarios y valoraciones

## 🐛 Solución de Problemas

### El sitio muestra "Not found" en rutas protegidas
- Verifica que hayas iniciado sesión (email en localStorage)
- Limpia el caché del navegador
- Reinicia el servidor de desarrollo

### Los estilos de Tailwind no se aplican
- Asegúrate de que `npm run dev` esté ejecutándose
- Limpia la carpeta `.next`: `rm -rf .next`
- Reinstala dependencias: `npm install`

### Error en "setIsLoading"
- Ya está solucionado en v1.0
- Los estados se actualizan de forma asincrónica con `Promise.resolve()`

## 📞 Contacto y Soporte

Para reportar bugs o sugerencias, contacta a través de la página de contacto en la aplicación.

---

**Versión:** 1.0.0  
**Última actualización:** Marzo 2026  
**Licencia:** MIT
