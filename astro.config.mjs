// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

import ui from "@nuxt/ui/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [ui()],
  },
  integrations: [vue({ appEntrypoint: "/src/app.ts" })],
});
