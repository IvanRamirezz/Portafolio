# Vista previa de proyectos web + actualización de tarjetas

## Contexto

`src/data/project.ts` tiene 5 proyectos estáticos, renderizados por `ProjectCard.astro` dentro de `Projects.astro`. Ninguna tarjeta es clicable hoy. `Projects.astro` además contiene un `<script>` que llama a `initProjectModal(projects)` importando desde una ruta inexistente (`../../data/projects`, plural) — `initProjectModal` nunca fue definida en el proyecto; es código muerto que genera un 404 en consola.

Se decidió (ver sesión de brainstorming) que la forma de "previsualización" para páginas web reales sea la opción B: captura estática + tarjeta clicable que abre el sitio real en una pestaña nueva. Se descartaron el modal con iframe embebido y el hover-con-iframe-en-vivo porque muchos sitios bloquean ser embebidos vía `X-Frame-Options`/CSP `frame-ancestors`, y esa falla no es detectable de forma confiable desde el cliente antes de intentarlo.

## Cambios de datos (`src/data/project.ts`)

- Se elimina la entrada `Axoloop`.
- El tipo de cada proyecto gana un campo opcional `url?: string`. Solo los proyectos con `url` se vuelven clicables; el resto (Wireguard, Nextcloud, Data Cleaning con Apps Script) se queda exactamente como está hoy — sin `url`, sin comportamiento de clic.
- **LabVR** (proyecto existente) gana `url: "https://dashboard-web-six-umber.vercel.app"`. Imagen, título, descripción y tags no cambian.
- Nuevo proyecto **NeoCodes**:
  - `url: "https://family-manager-eight.vercel.app/tienda"`
  - Descripción: tienda de códigos digitales hecha como freelance, conectada a un bot de Telegram para ventas y con panel administrativo para subir juegos y administrar el sitio.
  - Tags: `freelance`, `ecommerce`, `telegram-bot`, `admin-panel`.
  - Imagen: captura de pantalla real de la URL en vivo (ver "Generación de capturas").
- Nuevo proyecto **Actipulse**:
  - `url: "https://actipulse.com"`
  - Descripción: sitio web corporativo de Actipulse Neuroscience, desarrollado durante la práctica profesional de Web Development Intern.
  - Tags: `astro`, `css`, `tailwind` (coincide con lo ya descrito en la sección de Experiencia).
  - Imagen: captura de pantalla real de la URL en vivo.

## Cambios de componente (`src/components/ui/ProjectCard.astro`)

- La interfaz de Props gana `url?: string`.
- Si `url` está presente, el contenedor raíz de la tarjeta pasa de `<div class="project-card">` a `<a class="project-card" href={url} target="_blank" rel="noopener noreferrer">`. Si no hay `url`, se mantiene como `<div>` — sin cambio de comportamiento para los proyectos que no lo tienen.
- Se añade un indicador visual "↗ Ver sitio" superpuesto sobre la imagen, visible solo en `:hover` (mismo patrón ya usado en `Navbar`/`ProjectCard` de opacidad + transición), y solo cuando la tarjeta es un link. No se añade JavaScript nuevo — es CSS puro condicionado por si el elemento raíz es `<a>` o `<div>`.
- El resto del layout/estilo de la tarjeta (imagen, título, descripción, tags) no cambia.

## Limpieza relacionada (`src/components/sections/Projects.astro`)

- Se elimina el bloque `<script type="module">` que llama a `initProjectModal(projects)` (líneas ~30-36). Es código muerto de un intento de modal que nunca se completó y ya no aplica con el enfoque de "abrir en pestaña nueva". Eliminarlo quita el 404 de consola.

## Generación de capturas

- Las capturas de NeoCodes y Actipulse se generan visitando las URLs en vivo con un navegador headless (Playwright, ya usado puntualmente en esta sesión para depurar el diseño responsive) en un viewport ~1280×800, y se guardan como PNG en `public/images/` (p. ej. `neocodes.png`, `actipulse.png`), siguiendo el patrón de rutas ya usado (`${import.meta.env.BASE_URL}/images/...`).
- Es un paso manual de generación de assets, no una dependencia de build: Playwright no se agrega a `package.json`.
- LabVR conserva su imagen actual (`Logo.png`); no se genera una nueva captura para su dashboard.

## Fuera de alcance

- No se toca el comportamiento de scroll-snap/responsive corregido en un cambio anterior.
- No se agrega ningún modal, lightbox ni iframe.
- No se cambian tags/descripciones de los proyectos existentes que no sean LabVR.
