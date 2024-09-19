import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt()],
  site: 'https://portafolio.miguellugodev.com', // Tu URL base
  build: {
    outDir: './dist', // Directorio de salida para los archivos construidos
  }
})