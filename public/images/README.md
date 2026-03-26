# 📁 Carpeta de Imágenes

Aquí puedes poner las imágenes de los productos. 

## Instrucciones de uso:

1. **Coloca tus imágenes** en esta carpeta (formatos PNG, JPG, WEBP, etc.)

2. **Actualiza los productos** en [app/windows/tienda/page.tsx](../../app/windows/tienda/page.tsx):

```typescript
const productos: Producto[] = [
  { 
    id: 1, 
    titulo: "Laptop Pro 14", 
    precio: 1200, 
    descripcion: "Potencia máxima para programar.",
    imagen: "/images/laptop.jpg"  // Ruta local en lugar de URL remota
  },
  { 
    id: 2, 
    titulo: "Monitor 4K", 
    precio: 350, 
    descripcion: "Colores vivos y negros profundos.",
    imagen: "/images/monitor.jpg"  // Agrega aquí también
  },
  // ... más productos
];
```

## Recomendaciones:

- **Tamaño** de imagen: 400x300px (proporción 4:3)
- **Formato**: JPG o WEBP para mejor compresión
- **Nombre**: descriptivo (p.ej., `laptop.jpg`, `monitor-4k.jpg`)
- **Peso**: < 100KB por imagen

## Estructura actual:

```
/public/images/
├── README.md (este archivo)
└── (aquí van tus imágenes)
```

### Ejemplo de estructura con imágenes:

```
/public/images/
├── laptop.jpg
├── monitor.jpg
├── mouse.jpg
├── silla-gamer.jpg
└── README.md
```

## URLs a usar en el código:

Una vez agregues las imágenes, reemplaza:
- `imagen: "https://picsum.photos/seed/laptop/300/200"` 
- Por: `imagen: "/images/laptop.jpg"`

¡Listo para usar! 🚀
