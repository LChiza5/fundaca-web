# Rediseño del sitio web de FUNDACA

Rediseño y despliegue en la nube del sitio institucional de la **Fundación para el
Desarrollo del Área de Conservación Arenal** (FUNDACA), Tilarán, Guanacaste.

Proyecto del curso **ITI-522 Computación en la Nube** · Universidad Técnica Nacional,
Sede Guanacaste, Campus Corobicí · Profesora Ingrid Chavarría Montero.

**Equipo:** Luis Daniel Álvarez Vargas · Sebastián Villegas Barquero · Isaac López González

---

## Arrancar el proyecto

```bash
npm install
npm run dev
```

Queda en `http://localhost:3000`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Compila el sitio para producción |
| `npm run start` | Sirve la compilación de producción |
| `npm run lint` | Revisa el código con ESLint |

## Estructura

```
src/
  app/           una carpeta por página del sitio
  components/    piezas reutilizables (encabezado, pie, fauna, escenas)
  data/
    contenido.ts TODO el texto institucional vive aquí
public/
  marca/         logo de la fundación
docs/            documentación del proyecto y capturas
```

**Para cambiar textos, teléfonos, noticias o aliados no hay que tocar las páginas:**
todo sale de `src/data/contenido.ts`.

## Tecnologías

- **Next.js 16** con App Router y React 19
- **TypeScript**
- **Tailwind CSS 4**
- Ilustraciones propias en SVG (paisajes y fauna), sin imágenes con licencia
- Despliegue en **Vercel**

## Accesibilidad y rendimiento

- Todo el movimiento se desactiva con `prefers-reduced-motion`
- Navegación por teclado con enlace de salto al contenido
- Solo se animan `transform` y `opacity`, para no forzar recálculos de diseño
- Sin fotografías pesadas: los paisajes y animales son SVG de unos pocos kilobytes
