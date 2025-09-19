# Copilot Instructions for myportfoliodev

Purpose: Equip AI coding agents to work productively on this Astro + Tailwind portfolio.

## Stack & Architecture
- Framework: `Astro 4` with islands of interactivity using inline `<script is:inline>` in `.astro` files. Styling via `TailwindCSS` (`darkMode: 'class'`).
- Structure: `src/pages` (routes), `src/layouts` (page wrappers), `src/components` (UI building blocks), `src/components/icons` (SVG icons as Astro components), `public/` (static assets).
- Layout: `src/layouts/Layout.astro` defines `<head>`, fonts (`@fontsource-variable/onest`), global styles, and `Header`/`Footer`. Use it to wrap pages.
- Navigation/sections: Sections rendered with `SectionContainer.astro`; header links and IntersectionObserver rely on each section having `id` matching nav `aria-label`.
- Transitions: Uses `astro:transitions` `ViewTransitions` in layout; listen to `astro:after-swap` when persisting client state (see `ThemeToggle.astro`).

## Conventions
- Imports: Use path alias `@/*` → `src/*` (see `tsconfig.json`). Prefer absolute imports like `@/components/Hero.astro`.
- Styling: Prefer utility classes; shared section wrapper is `SectionContainer` which adds responsive container + `scroll-m-20`.
- Icons: Reusable Astro icon components live in `src/components/icons/` and accept `class` for sizing (`size-*`).
- Client JS: Keep scripts minimal and inline (`<script is:inline>`) within the component/page that owns the behavior. Persist UI across transitions via `astro:*` events.
- Dark mode: Toggle by adding/removing `dark` on `document.documentElement`. Respect `localStorage('theme')` and system preference.

## Build, Run, Deploy
- Dev server: `pnpm dev` (alias `pnpm start`) runs `astro dev`.
- Type check + build: `pnpm build` runs `astro check && astro build` with output to `dist/`.
- Preview: `pnpm preview` serves the built site locally.
- Hosting: `firebase.json` serves `dist/` and rewrites `** → /index.html`. Deploy via Firebase Hosting (repo does not include CLI scripts; use `firebase deploy`).

## Key Files
- `astro.config.mjs`: Integrations `@astrojs/tailwind` and `astro-robots-txt`; `site` and `build.outDir` set.
- `tailwind.config.mjs`: Scans `.astro|html|js|ts|jsx|tsx|md(x)|svelte|vue` under `src/`; `darkMode: 'class'`.
- `src/layouts/Layout.astro`: Global styles, background gradients, and `ViewTransitions` setup.
- `src/components/Header.astro`: Top nav; highlights active section via `IntersectionObserver` using `data-section`/`id` from `SectionContainer`.
- `src/components/ThemeToggle.astro`: Theme dropdown, localStorage key `theme`, updates icons and `documentElement.classList`.
- `src/components/Projects.astro`: Project cards; tags defined inline with icon components.

## Patterns & Gotchas
- Sections and nav: When creating a new section, wrap in `SectionContainer` and set `id` (e.g., `id="proyectos"`), then add matching nav entry `{ aria-label: 'proyectos', href: '/#proyectos' }`.
- Transitions + state: After route swaps, reapply theme and reset scroll: see `document.addEventListener('astro:after-swap', ...)` in `ThemeToggle.astro`.
- Accessibility: Provide `aria-label` on nav links, `sr-only` text for icon-only buttons, and descriptive `alt` on images.
- Assets: Place static files in `public/` (e.g., `public/projects/*`). Use full URLs for remote images as currently done in `Projects.astro`.
- Aliases: Ensure `tsconfig.json` `paths` are respected in imports; Vite handles it via Astro config.

## Common Tasks
- Add a page: Create `src/pages/<slug>.astro`, wrap with `Layout`, export `title`/`description` props.
- Add a component: Place in `src/components/Name.astro`; accept `class` and forward via `class={className}` as done in `SectionContainer`.
- Add an icon: New file in `src/components/icons/` exporting markup; pass `class` for sizing.
- Add a project card: Edit `src/components/Projects.astro` `PROJECTS` array; tag objects exist in-file.
- Update theme behavior: Edit `ThemeToggle.astro`; keep `updateTheme()` and `updateIcon()` in sync.

## Example Snippets
- Import with alias: `import Layout from '@/layouts/Layout.astro'`
- Section pattern:
  ```astro
  <SectionContainer id="contacto">
    <h2 class="text-3xl font-semibold">Contacto</h2>
    <!-- content -->
  </SectionContainer>
  ```
- Nav entry in `Header.astro`:
  ```ts
  { title: 'Contacto', label: 'contacto', url: '/#contacto' }
  ```

## Quality Bar
- Keep components presentational and focused; colocate minimal JS for interactions.
- Follow Tailwind utility-first approach; avoid custom CSS unless needed in `<style>` blocks.
- Match existing class naming and spacing; prefer `size-*` for icons.

If any workflow or convention is unclear (e.g., Firebase deploy steps, adding tests), ask for details and I’ll refine these instructions.
