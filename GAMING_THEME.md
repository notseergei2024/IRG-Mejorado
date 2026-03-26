# 🎮 Tailwind CSS - Paleta Gaming

## Configuración tema gaming para el proyecto

Todos los colores están centralizados en `tailwind.config.ts` bajo el objeto `gaming`.

### 🎨 Paleta de Colores

#### Fondos Oscuros
- **gaming-dark**: `#0a0e27` - Negro game principal
- **gaming-darker**: `#050812` - Negro profundo (fondos base)

#### Colores Neón Primarios
- **gaming-cyan**: `#00d9ff` - Cyan neon (contraste principal)
- **gaming-purple**: `#b827dc` - Púrpura vibrante (secundario)
- **gaming-pink**: `#ff0080` - Pink neon (acentos)
- **gaming-green**: `#39ff14` - Green neon (éxito/confirmación)

#### Colores Secundarios
- **gaming-blue**: `#0066cc` - Azul profundo
- **gaming-orange**: `#ff6600` - Naranja (acciones destructivas/alertas)

#### Escala de Grises
- **gaming-text**: `#e0e7ff` - Gris claro (texto principal)
- **gaming-muted**: `#9ca3af` - Gris medio (texto secundario)
- **gaming-darkGray**: `#374151` - Gris oscuro (fondo secundario)

### 🎯 Componentes Reutilizables

Definidos en `globals.css` con @layer components:

```css
.btn-primary       /* Gradiente neon purple → cyan */
.btn-secondary     /* Azul profundo con brillo */
.btn-accent        /* Cyan con sombra neon */
.input-gaming      /* Inputs estilizados con bordes cyan */
.card-gaming       /* Cards oscuras con borde cyan sutil */
.gradient-text     /* Texto con gradiente neon */
```

### 🌈 Efectos Especiales

- **Sombras Neon**: `shadow-neon-cyan`, `shadow-neon-purple`, `shadow-neon-pink`, `shadow-glow`
- **Gradientes Personalizados**: 
  - `gradient-gaming` (fondo base)
  - `gradient-neon` (botones primarios)
  - `gradient-alt` (alternativas)

### 📱 Responsividad

Todos los componentes usan:
- Grid responsive con `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Valores dinámicos con Tailwind's breakpoints
- Animaciones suaves con `transition-all duration-300`

### ✨ Características Implementadas

1. **Página Home** - Landing gaming con gradiente de fondo, efectos blur
2. **Autenticación** - Cards estilizadas con inputs y botones gaming
3. **Tienda** - Grid de productos con hover effects y sombras neon
4. **Carrito** - Resumen con gradientes de precios
5. **Contacto** - Formulario y cards info con colores diferenciados
6. **Headers/Footers** - Barras navigation gaming con colores coherentes

### 🔧 Variables CSS Disponibles

Usa directamente en className:

```jsx
// Colores
className="text-gaming-cyan"
className="bg-gaming-dark"
className="border-gaming-cyan/20"  /* con opacidad */

// Componentes
className="btn-primary"
className="card-gaming"
className="input-gaming"

// Efectos
className="shadow-neon-cyan"
className="gradient-text"
```

### 📝 Notas

- La paleta es completamente coherente y gaming-themed
- Todos los colores tienen suficiente contraste para accesibilidad
- Los efectos neon se usan estratégicamente sin sobrecargar
- La configuración es extensible para agregar nuevos colores
