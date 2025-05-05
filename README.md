# Astro Template: Mars Rover

> Note: Nuxt UI 3.1 or newer is not supported with this template. This is due to how Nuxt UI now handles the vue-router dependency. As of 05-01-2025 this template will no longer be maintained because of this change and should not be used.

Astro **Mars Rover** is an opinionated Astro 5 starter template with built-in support for Vue, Nuxt UI (3.0 only), Tailwind CSS, Prettier, view transitions, and import aliases and includes a blank default "index.astro" page.

Using `create-astro@latest` provides everything you need to create a basic Astro application. However, it is missing a few useful items that you might find yourself manually adding to every new Astro project. The **Mars Rover** template was created to automatically include these items as well as support for Vue and Nuxt UI (for Vue components only). This provides a great starting point for a new Astro project with Vue client islands, Tailwind and Nuxt UI.

The template includes:
- An initial Astro project structure
- Astro [View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- Astro [Import Aliases](https://docs.astro.build/en/guides/typescript/#import-aliases)
- [Prettier](https://prettier.io/)
- [Vue](https://vuejs.org/)
- [Nuxt UI v3.0](https://ui.nuxt.com/) - includes [Tailwind CSS v4.1](https://tailwindcss.com/)
- An _app.ts_ file that provides an alternate method for initializing and configuring Vue for allowing integration of the Nuxt UI plugin
- A default _MainLayout.astro_ layout file
- A default _global.css_ file
- Default _.vscode_ files to properly handle Tailwind CSS, recommended extensions, and default Prettier formatters
- The `dev` script set to `"astro dev --open"`

## Deployment Methods
### bun
```sh
bunx create-astro@latest -- --template smart-ace-designs/astro-marsrover project-name
```
### npm
```sh
npx create-astro@latest -- --template smart-ace-designs/astro-marsrover project-name
```
### pnpm
```sh
pnpm create astro@latest --template smart-ace-designs/astro-marsrover project-name
```
### yarn
```sh
yarn create astro@latest --template smart-ace-designs/astro-marsrover project-name
```
## Using Nuxt UI Components
Nuxt UI includes Tailwind CSS v4.1 by default and does not require a separate installation/configuration of it in the Astro project.  Both Astro and Vue components can use Tailwind CSS as normal.

Nuxt UI components are not supported directly in native Astro files.

When using Nuxt UI with a Vue [Client Island](https://docs.astro.build/en/concepts/islands/#client-islands) component in Astro, it is recommended to wrap the HTML within the [`App`](https://ui.nuxt.com/components/app) component which provides global configuration for all components and is required for the `Toast` and `Tooltip` components.

```ts
<!-- src/components/MyComponent.vue -->

<script setup lang="ts">
const toast = useToast();

function showToast() {
  toast.add({
    title: "Welcome to Mars Rover.",
    description: "An opinionated Astro template for use with Vue and Nuxt UI.",
    icon: "i-lucide-rocket",
  });
}
</script>

<template>
  <UApp :toaster="{ position: 'bottom-center' }">
    <main class="flex h-screen items-center justify-center">
      <UButton label="Welcome" color="neutral" variant="outline" @click="showToast" />
    </main>
  </UApp>
</template>
```

Due to the nature of the Nuxt UI architecture, only the `client:only="vue"` directive is supported.

```ts
<!-- src/pages/index.astro -->

---
import MainLayout from "@/layouts/MainLayout.astro";
import MyComponent from "@/components/MyComponent.vue";
---

<MainLayout title="Mars { } Rover">
  <MyComponent client:only="vue" />
</MainLayout>

```

To change the Nuxt UI default color mode from "dark" to "light", add `colorMode: false` to the __Vite__ object __plugins__ property in the "astro.config.mjs" file.

```mjs
<!-- astro.config.mjs -->

export default defineConfig({
  vite: {
    plugins: [ui({ colorMode: false })],
  },
  integrations: [vue({ appEntrypoint: "/src/app.ts" })],
});
```

## Project Structure
After deploying the Astro **Mars Rover** template you will see the following files and directories in your project root:

```text
/
├── .vscode/
│       └── extensions.json
│       └── launch.json
│       └── settings.json
├── public/
│       └── favicon.svg
├── src/
|   ├── layouts/
│       └── MainLayout.astro
│   ├── pages/
│       └── index.astro
|   ├── styles/
│       └── global.css
│   └── app.ts
├── .gitignore
├── .prettierrc.mjs
├── astro.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

The optional `New-AstroProject` PowerShell function will add these additional directories to your project root:

```text
/
└── src/
    ├── assets/
    └── components/
```
