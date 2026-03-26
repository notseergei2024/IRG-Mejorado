# 📚 MI COLECCIÓN DE COMICS

Una aplicación web moderna para gestionar tu colección de cómics de DC Comics y otros universos. Organiza tus colecciones, registra cómics individuales con información detallada, y guarda variantes de portadas con dibujantes específicos.

![DC Comics Logo](public/images/DClogo.jpg)

---

## ✨ Características Principales

### 🗂️ **Sistema Jerárquico de Organización**
- **Colecciones**: Agrupa tus cómics por universo (Marvel, DC, Independientes, etc.)
- **Cómics**: Dentro de cada colección, manage cómics individuales con número, título, autor y dibujante
- **Portadas Variantes**: Para cada cómic, registra múltiples variantes de portada con dibujantes diferentes

### 📊 **Gestión Completa (CRUD)**
- ✅ **Crear**: Nuevas colecciones, cómics y variantes de portada
- ✅ **Leer**: Visualizar toda tu biblioteca en grillas intuitivas
- ✅ **Actualizar**: Cambiar información (próxima versión)
- ✅ **Eliminar**: Remover elementos a cualquier nivel

### 🖼️ **Gestión de Imágenes**
- Sube imágenes para portadas de colecciones
- Sube imágenes para cómics individuales
- Sube imágenes para cada variante de portada
- Almacenamiento en base64 dentro de localStorage
- Preview en tiempo real durante la carga

### 📱 **Interfaz Responsiva**
- Grid 3x3 para todas las visualizaciones
- Diseño adaptativo para dispositivos
- Animaciones suaves y efectos hover
- Tema gaming con paleta de colores personalizada

### 👤 **Autenticación Básica**
- Registro de nuevos usuarios
- Login con email y contraseña
- Almacenamiento seguro en localStorage
- Protección de rutas privadas

### 📊 **Panel de Estadísticas**
- Total de colecciones
- Total de cómics en tu biblioteca
- Total de variantes de portada
- Cantidad de imágenes subidas

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16.2.0 (App Router)
- **Frontend**: React 19.2.4 con TypeScript
- **Styling**: Tailwind CSS v4 + PostCSS
- **Estado**: React Hooks (useState, useEffect, useRouter)
- **Persistencia**: localStorage con JSON
- **Imágenes**: FileReader API (base64)

---

## 📂 Estructura del Proyecto

```
irg/
├── app/
│   ├── page.tsx                          # Landing/Inicio con Logo DC
│   ├── layout.tsx                        # Layout raíz
│   ├── globals.css                       # Estilos globales
│   ├── api/
│   │   └── auth/
│   │       └── route.tsx                 # Endpoint autenticación
│   ├── Registroylogin/
│   │   ├── layout.tsx                    # Layout auth
│   │   ├── newlogin/
│   │   │   └── page.tsx                  # Página login con Logo DC
│   │   └── register/
│   │       └── page.tsx                  # Página registro con Logo DC
│   └── windows/
│       ├── layout.tsx                    # Layout app principal
│       ├── tienda/
│       │   └── page.tsx                  # CRUD Colecciones/Cómics/Portadas
│       ├── carrito/
│       │   └── page.tsx                  # Perfil de usuario
│       └── contacto/
│           └── page.tsx                  # Página de ayuda y FAQ
├── public/
│   └── images/
│       └── DClogo.jpg                    # Logo DC
├── tailwind.config.ts                    # Configuración Tailwind
├── postcss.config.mjs                    # Configuración PostCSS
├── tsconfig.json                         # Configuración TypeScript
├── next.config.ts                        # Configuración Next.js
├── package.json                          # Dependencias
└── README.md                             # Este archivo
```

---

## 📊 Estructura de Datos

### localStorage Keys

```javascript
// Colecciones y su contenido jerárquico
localStorage["colecciones"] = [
  {
    id: "1711234567890",                        // Timestamp único
    nombre: "Marvel",                           // Nombre colección
    descripcion: "Colección de Marvel Comics",  // Descripción
    imagen: "data:image/jpeg;base64,...",       // Imagen en base64
    comics: [
      {
        id: "1711234567891",
        numero: 1,
        titulo: "The Amazing Spider-Man",
        autor: "Stan Lee",
        dibujante: "Steve Ditko",
        año: 1963,
        imagen: "data:image/jpeg;base64,...",
        portadas: [
          {
            id: "1711234567892",
            titulo: "The Amazing Spider-Man",
            variante: "Portada Regular",
            dibujante: "Steve Ditko",
            imagen: "data:image/jpeg;base64,...",
            fechaAgregado: "26/3/2026"
          },
          {
            id: "1711234567893",
            titulo: "The Amazing Spider-Man",
            variante: "Variant 1:25",
            dibujante: "Alex Ross",
            imagen: "data:image/png;base64,...",
            fechaAgregado: "26/3/2026"
          }
        ],
        fechaAgregado: "26/3/2026"
      }
    ],
    fechaCreacion: "26/3/2026"
  }
]

// Usuario logueado
localStorage["user"] = "usuario@email.com"
```

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18.0+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone <repositorio>
cd irg

# Instalar dependencias
npm install

# Construir el proyecto
npm run build

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

### Acceso
- **Inicio**: http://localhost:3000
- **Registro**: http://localhost:3000/Registroylogin/register
- **Login**: http://localhost:3000/Registroylogin/newlogin
- **App Principal**: http://localhost:3000/windows/tienda (requiere login)

---

## 📖 Guía de Uso

### 1️⃣ **Crear una Colección**
1. Haz clic en "➕ Nueva Colección"
2. Ingresa nombre y descripción (opcional)
3. Sube una imagen de portada (opcional)
4. Haz clic en "💾 Crear Colección"

### 2️⃣ **Agregar Cómics a una Colección**
1. Haz clic en una colección para abrirla
2. Haz clic en "➕ Nuevo Comic"
3. Completa:
   - Número del cómic
   - Título
   - Autor
   - Dibujante
   - Año (opcional)
   - Imagen (opcional)
4. Haz clic en "💾 Guardar Comic"

### 3️⃣ **Agregar Portadas Variantes**
1. Dentro de una colección, haz clic en un cómic
2. Haz clic en "➕ Nueva Variante"
3. Completa:
   - Variante (Regular, 1:25, Second Print, Sketch, etc.)
   - Dibujante de esta portada
   - Imagen (opcional)
4. Haz clic en "💾 Guardar Portada"

### 📊 **Ver Estadísticas**
- Accede a tu perfil desde el menú
- Visualiza: Colecciones, Cómics, Variantes, Imágenes subidas

### ❓ **Ayuda y FAQ**
- Accede a la página de Ayuda desde el menú
- Guía completa con instrucciones paso a paso

---

## 🗂️ Niveles de Navegación

La aplicación tiene 3 niveles jerárquicos:

### Nivel 1: Colecciones
- Grid 3x3 mostrando todas las colecciones
- Imagen de portada de colección
- Contador de cómics
- Botones: Eliminar
- Clic en tarjeta → Abre colección

### Nivel 2: Cómics en Colección
- Muestra nombre de colección actual
- Grid 3x3 con cómics de esa colección
- Imagen del cómic (portada)
- Número, título, autor, dibujante
- Contador de variantes
- Botones: Atrás, Eliminar
- Clic en tarjeta → Abre portadas

### Nivel 3: Portadas en Cómic
- Muestra colección y cómic actual
- Grid 3x3 con variantes de portada
- Imagen de la portada variante
- ID único (#123456)
- Variante, Dibujante destacado
- Fecha de agregado
- Botones: Atrás, Eliminar

---

## 🎨 Tema Gaming

### Paleta de Colores Personalizada

```css
--gaming-dark: #0a0e27        /* Fondo muy oscuro */
--gaming-darker: #050810      /* Fondo más oscuro */
--gaming-cyan: #00d4ff        /* Cian brillante */
--gaming-purple: #d946ef      /* Púrpura */
--gaming-pink: #ec4899        /* Rosa */
--gaming-green: #10b981       /* Verde */
--gaming-blue: #3b82f6        /* Azul */
--gaming-orange: #ff8c00      /* Naranja */
--gaming-text: #e5e7eb        /* Texto claro */
--gaming-muted: #9ca3af       /* Texto apagado */
```

### Componentes CSS Personalizados

- `.btn-primary`: Botón principal (cyan/gaming-cyan)
- `.btn-secondary`: Botón secundario (morado/gaming-purple)
- `.btn-accent`: Botón acentuado
- `.input-gaming`: Campos de entrada personalizados
- `.card-gaming`: Tarjetas con borde gaming-cyan
- `.gradient-text`: Texto con gradiente (gaming-cyan a gaming-purple)

---

## 💾 Almacenamiento de Datos

### localStorage
- **Ubicación**: Navegador del usuario
- **Límite**: ~5-20 MB por dominio
- **Persistencia**: Entre sesiones del navegador
- **Privacidad**: Datos locales del usuario

### Ventajas
✅ No requiere servidor/DB  
✅ Rápido y sin latencia  
✅ Privacidad del usuario  
✅ Gratis (sin costos)

### Desventajas
❌ Se pierde si se limpia el caché  
❌ No compartible entre dispositivos  
❌ Límite de almacenamiento (~20 MB)
❌ Solo texto (se guarda en JSON/base64)

### Recomendaciones
- Comprimir imágenes a 400x600px
- Máximo 5-10 MB de imágenes por colección
- Hacer copy del JSON en archivo si es valioso

---

## 🔒 Seguridad

### Implementado
- ✅ Verificación de usuario logueado en rutas privadas
- ✅ Redirección automática a login si no hay sesión
- ✅ Guardado seguro en localStorage
- ✅ Protección contra acceso no autorizado

### Próximas Mejoras
- [ ] Hash de contraseñas con bcrypt
- [ ] Autenticación JWT
- [ ] Backend API segura
- [ ] Validación en servidor
- [ ] Rate limiting
- [ ] HTTPS obligatorio

---

## 📋 Campos Disponibles

### Colección
- `nombre` (requerido) - Ej: "Marvel", "DC Comics"
- `descripcion` (opcional) - Ej: "Sagá del Universo Marvel"
- `imagen` (opcional) - Imagen en base64

### Cómic
- `numero` (requerido) - Ej: 1, 42, 156
- `titulo` (requerido) - Ej: "The Amazing Spider-Man"
- `autor` (requerido) - Ej: "Stan Lee"
- `dibujante` (requerido) - Ej: "Steve Ditko"
- `año` (opcional) - Ej: 1963
- `imagen` (opcional) - Imagen en base64

### Portada Variante
- `variante` (requerido) - Ej: Regular, 1:25, Second Print, Sketch
- `dibujante` (requerido) - Dibujante de esta variante
- `imagen` (opcional) - Imagen en base64

---

## 📱 Compatibilidad

| Browser | Versión Mínima | Soporte |
|---------|-----------------|---------|
| Chrome | 90+ | ✅ Completo |
| Firefox | 88+ | ✅ Completo |
| Safari | 14+ | ✅ Completo |
| Edge | 90+ | ✅ Completo |

| Dispositivo | Soporte |
|-------------|---------|
| Desktop | ✅ Óptimo |
| Tablet | ✅ Responsivo |
| Mobile | ✅ Responsivo |

---

## 🚀 Próximas Características

### Fase 2
- [ ] Editar cómics y variantes (no solo crear y eliminar)
- [ ] Búsqueda global por título, autor, dibujante
- [ ] Filtrado por estado (pendiente/comprado)
- [ ] Ordenamiento personalizado

### Fase 3
- [ ] Exportar colección a PDF
- [ ] Importar desde JSON
- [ ] Backup automático a la nube
- [ ] Vista de galería con filtros

### Fase 4
- [ ] Backend API REST
- [ ] Base de datos MongoDB/PostgreSQL
- [ ] Autenticación segura JWT
- [ ] Multi-dispositivo sincronizado

### Futuro
- [ ] Calificaciones y reseñas
- [ ] Comunidad de coleccionistas
- [ ] Marketplace de compra/venta
- [ ] App móvil nativa
- [ ] Comparación de colecciones con otros usuarios

---

## 🎯 Casos de Uso

### Para Coleccionistas Serios
- Registra cada cómic con detalles completos
- Documenta todas las variantes de portada
- Sabe exactamente qué tienes en tu colección
- Identifica qué falta para completar sagas

### Para Fanáticos de DC Comics
- Crea colecciones por héroe: Batman, Superman, Wonder Woman
- Crea colecciones por saga: "The Dark Knight", "Infinite Crisis"
- Guarda ediciones especiales y limitadas
- Registra dibujantes alternativos de portadas
- Organiza por décadas

### Para Gestión Personal
- Control completo de tu biblioteca
- Planificación de compras futuras
- Documentación de inversión
- Catálogo personal detallado

---

## 📞 Contacto y Soporte

Para reportar bugs o sugerencias:
- Abre un issue en GitHub
- Contacta al desarrollador

---

## 🙏 Agradecimientos

- **DC Comics**: Por el universo de historias increíbles
- **Next.js**: Framework increíble para React
- **Tailwind CSS**: Utilidades CSS poderosas
- **TypeScript**: Tipado estático para JavaScript

---

## 📜 Historial de Cambios

### v1.0.0 (26/3/2026) - Inicial
- ✅ Sistema jerárquico Colecciones → Cómics → Portadas
- ✅ CRUD completo para los 3 niveles
- ✅ Almacenamiento en localStorage
- ✅ Gestión de imágenes en base64
- ✅ Autenticación básica
- ✅ Panel de estadísticas
- ✅ Página de ayuda y FAQ
- ✅ Logo DC en pantallas de autenticación
- ✅ Tema gaming con colores personalizados

---

**Versión**: 1.0.0  
**Fecha Actual**: Marzo 2026  
**Estado**: En Desarrollo  
**Licencia**: Privada
