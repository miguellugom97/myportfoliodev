# Copilot Instructions for myportfoliodev

Purpose: Equip AI coding agents to work prod## Barra de Calidad
- Mantén los componentes de presentación y enfocados; coloca JS mínimo para interacciones.
- Sigue el enfoque utility-first de Tailwind; evita CSS personalizado a menos que sea necesario en bloques `<style>`.
- Coincide con la nomenclatura de clases y espaciado existentes; prefiere `size-*` para iconos.
- Asegúrate de que todas las páginas utilicen el componente `Layout` para mantener la coherencia.

Si algún flujo de trabajo o convención no está claro (ej., pasos de despliegue de Firebase, añadir pruebas), pide detalles y refinaré estas instrucciones.ly on this Astro + Tailwind portfolio.

## Stack & Architecture
- Framework: `Astro 4` con islas de interactividad usando `<script is:inline>` en archivos `.astro`. Estilos con `TailwindCSS` (`darkMode: 'class'`).
- Estructura: `src/pages` (rutas), `src/layouts` (envoltorios de página), `src/components` (bloques de UI), `src/components/icons` (iconos SVG como componentes Astro), `public/` (activos estáticos).
- Layout: `src/layouts/Layout.astro` define `<head>`, fuentes (`@fontsource-variable/onest`), estilos globales y `Header`/`Footer`. Úsalo para envolver páginas.
- Navegación/secciones: Secciones renderizadas con `SectionContainer.astro`; los enlaces del encabezado e IntersectionObserver dependen de que cada sección tenga un `id` que coincida con el `aria-label` de navegación.
- Transiciones: Usa `astro:transitions` `ViewTransitions` en layout; escucha `astro:after-swap` cuando persista el estado del cliente (ver `ThemeToggle.astro`).

## Convenciones
- Importaciones: Usa el alias de ruta `@/*` → `src/*` (ver `tsconfig.json`). Prefiere importaciones absolutas como `@/components/Hero.astro`.
- Estilos: Prefiere clases de utilidad; el envoltorio de sección compartido es `SectionContainer` que agrega contenedor responsive + `scroll-m-20`.
- Iconos: Los componentes de iconos reutilizables de Astro viven en `src/components/icons/` y aceptan `class` para dimensionamiento (`size-*`).
- JS Cliente: Mantén los scripts mínimos e en línea (`<script is:inline>`) dentro del componente/página que posee el comportamiento. Persiste la UI a través de transiciones vía eventos `astro:*`.
- Modo oscuro: Alterna añadiendo/eliminando `dark` en `document.documentElement`. Respeta `localStorage('theme')` y preferencia del sistema.

## Build, Run, Deploy
- Servidor de desarrollo: `pnpm dev` (alias `pnpm start`) ejecuta `astro dev`.
- Verificación de tipos + build: `pnpm build` ejecuta `astro check && astro build` con salida a `dist/`.
- Vista previa: `pnpm preview` sirve el sitio construido localmente.
- Hosting: `firebase.json` sirve `dist/` y reescribe `** → /index.html`. Despliega vía Firebase Hosting (el repo no incluye scripts CLI; usa `firebase deploy`).

## Archivos Clave
- `astro.config.mjs`: Integraciones `@astrojs/tailwind` y `astro-robots-txt`; `site` y `build.outDir` configurados.
- `tailwind.config.mjs`: Escanea `.astro|html|js|ts|jsx|tsx|md(x)|svelte|vue` bajo `src/`; `darkMode: 'class'`.
- `src/layouts/Layout.astro`: Estilos globales, gradientes de fondo y configuración de `ViewTransitions`.
- `src/components/Header.astro`: Navegación superior; resalta la sección activa vía `IntersectionObserver` usando `data-section`/`id` de `SectionContainer`.
- `src/components/ThemeToggle.astro`: Desplegable de tema, clave localStorage `theme`, actualiza iconos y `documentElement.classList`.
- `src/components/Projects.astro`: Tarjetas de proyectos; etiquetas definidas en línea con componentes de iconos.
- `src/components/SectionContainer.astro`: Contenedor reutilizable para secciones con `scroll-m-20` para desplazamiento suave.

## Patrones & Consideraciones
- Secciones y navegación: Al crear una nueva sección, envuélvela en `SectionContainer` y establece `id` (ej., `id="proyectos"`), luego agrega entrada de navegación coincidente `{ aria-label: 'proyectos', href: '/#proyectos' }`.
- Transiciones + estado: Después de intercambios de ruta, vuelve a aplicar el tema y restablece el desplazamiento: ver `document.addEventListener('astro:after-swap', ...)` en `ThemeToggle.astro`.
- Accesibilidad: Proporciona `aria-label` en enlaces de navegación, texto `sr-only` para botones solo con iconos y `alt` descriptivo en imágenes.
- Assets: Coloca archivos estáticos en `public/` (ej., `public/projects/*`). Usa URLs completas para imágenes remotas como se hace actualmente en `Projects.astro`.
- Alias: Asegúrate de que `tsconfig.json` `paths` sean respetados en importaciones; Vite los maneja vía configuración de Astro.
- IntersectionObserver: La navegación utiliza un observer para destacar la sección activa durante el desplazamiento - implementado en `Header.astro`.

## Tareas Comunes
- Agregar una página: Crea `src/pages/<slug>.astro`, envuelve con `Layout`, exporta propiedades `title`/`description`.
- Agregar un componente: Colócalo en `src/components/Name.astro`; acepta `class` y reenvía vía `class={className}` como se hace en `SectionContainer`.
- Agregar un icono: Nuevo archivo en `src/components/icons/` exportando marcado; pasa `class` para dimensionamiento.
- Agregar una tarjeta de proyecto: Edita array `PROJECTS` en `src/components/Projects.astro`; objetos de etiquetas existen en el archivo.
- Actualizar comportamiento de tema: Edita `ThemeToggle.astro`; mantén `updateTheme()` y `updateIcon()` sincronizados.

## Ejemplos de Fragmentos
- Importación con alias: `import Layout from '@/layouts/Layout.astro'`
- Patrón de sección:
  ```astro
  <SectionContainer id="contacto">
    <h2 class="text-3xl font-semibold">Contacto</h2>
    <!-- contenido -->
  </SectionContainer>
  ```
- Entrada de navegación en `Header.astro`:
  ```ts
  { title: 'Contacto', label: 'contacto', url: '/#contacto' }
  ```
- Componente de icono nuevo (ej., `src/components/icons/NewIcon.astro`):
  ```astro
  ---
  interface Props {
    class?: string
  }
  
  const { class: className } = Astro.props
  ---
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- Contenido SVG aquí -->
  </svg>
  ```

## Quality Bar
- Keep components presentational and focused; colocate minimal JS for interactions.
- Follow Tailwind utility-first approach; avoid custom CSS unless needed in `<style>` blocks.
- Match existing class naming and spacing; prefer `size-*` for icons.

If any workflow or convention is unclear (e.g., Firebase deploy steps, adding tests), ask for details and I’ll refine these instructions.
