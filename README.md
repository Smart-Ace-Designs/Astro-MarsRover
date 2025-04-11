# Astro Template: Mars Rover

**Mars Rover** is an opinionated Astro 5 starter template with built-in support for Vue, Nuxt UI, Tailwind CSS, Prettier, view transitions, and import aliases.

Using `bunx create-astro@latest` or `npx create-astro@latest` provides everything you need to create a basic Astro application. However, it is missing a few useful items that I found myself manually adding to every Astro project I created. To address this problem, I created this template to automatically include these items plus support for Vue and Nuxt UI. Additionally, a custom PowerShell function was created to deploy this template and provide some additional functionality that the template cannot.

The template includes:

- [Tailwind CSS v4.1](https://tailwindcss.com/)
- [Prettier](https://prettier.io/)
- [Vue](https://vuejs.org/)
- [Nuxt UI v3.0](https://ui.nuxt.com/)
- Astro [View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- Astro [Import Aliases](https://docs.astro.build/en/guides/typescript/#import-aliases)
- A default _MainLayout.astro_ layout file
- A default _global.css_ file
- Default _.vscode_ files to properly handle Tailwind CSS, recommended extensions, and default Prettier formatters
- The `dev` script set to `"astro dev --open"`

The PowerShell function:

- Creates an additional empty folder: _assets_
- Blanks out the _README.md_ file
- Runs the `prettier` CLI to provide an intial format of all project files
- Initializes a _Git_ repository
- Automatically navigates to the project folder and peforms an initial install
- Runs `astro update` to update the core Astro packages to the latest versions and runs your preferred package manager (npm or bun) to update the other packages
- Provides an option to launch the site and/or open the project folder with VS Code post deployment

## Deployment Methods

> Using `bunx create-astro@latest` is dependent on **npm** being present in the path. It is recommended to install **Node.js** even if **Bun** is used exclusively.

### bun

```sh
bunx create-astro@latest -- --template smart-ace-designs/astro-marsrover project-name
```

### npm

```sh
npx create-astro@latest -- --template smart-ace-designs/astro-marsrover project-name
```

### PowerShell

Add this function to your PowerShell profile or a PowerShell module:

```powershell
function New-AstroProject
{
    [CmdletBinding()]
    Param
    (
        [Parameter(Mandatory = $true)] [string]$ProjectName,
        [Parameter(Mandatory = $true)] [string]$Location,
        [Parameter(Mandatory = $true)] [ValidateSet(
            "astro-major-tom",
            "astro-marsrover",
            "astro-moonbase",
            "astro-space",
            "astro-starbreeze"
        )] [string]$Template,
        [Parameter(Mandatory = $false)] [switch]$StartApp,
        [Parameter(Mandatory = $false)] [switch]$StartCode,
        [Parameter(Mandatory = $false)] [ValidateSet(
            "bun",
            "npm"
        )] [string]$PackageManager = "bun"
    )

    switch ($PackageManager)
    {
        "bun" {$PackageManagerX = "bunx"}
        "npm" {$PackageManagerX = "npx"}
    }

    Clear-Host
    $Message = "Astro Deployment Tool"
    $Width = $Host.UI.RawUI.WindowSize.Width
    Write-Host
    Write-Host ((" " * ($Width - $Message.Length)) + $Message) -ForegroundColor Green
    Write-Host ("=" * $Width)

    if (Test-Path -Path "$Location\$ProjectName")
    {
        Write-Host "`nProject folder ($ProjectName) already exists."
        Write-Host "Operation cancelled...liftoff failed!"
        return
    }

    Set-Location $Location
    & $PackageManagerX create-astro@latest -- --template smart-ace-designs/$($Template) `
        --git --no-install $ProjectName

    if (!(Test-Path -Path $ProjectName))
    {
        Write-Host "`nProject folder ($ProjectName) was not created."
        Write-Host "Operation cancelled...liftoff failed!"
        Write-Host "`nIf using Bun please run `"bun pm cache rm`" to clear the cache and try again."
        return
    }

    Write-Host
    Set-Location $ProjectName
    switch ($PackageManager)
    {
        "bun" {& $PackageManager install --no-summary}
        "npm" {& $PackageManager install --silent}
    }

    & $PackageManagerX @astrojs/upgrade
    & $PackageManager update --silent --save

    if (!(Test-Path -Path "src/components"))
    {
        [void](New-Item -Name "components" -Path src -ItemType Directory)
    }
    if (!(Test-Path -Path "src/assets"))
    {
        [void](New-Item -Name "assets" -Path src -ItemType Directory)
    }
    Clear-Content -Path "README.md"

    Write-Host
    & $PackageManagerX prettier . --write --log-level silent
    & $PackageManagerX prettier . --check
    if ($StartCode -and (Get-Command code -ErrorAction SilentlyContinue)) {code .}
    Write-Host
    Write-Host ("=" * $Width)
    if ($StartApp) {& $PackageManager run dev}
}
```

```sh
New-AstroProject -ProjectName project-name -Location parent-folder -Template astro-marsrover
```

## Nuxt UI Notes

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

Due to the nature of the Nuxt UI architecture, only the `client:only` directive is supported.

```ts
<!-- src/pages/index.astro -->

---
import MainLayout from "@/layouts/MainLayout.astro";
import MyComponent from "@/components/MyComponent.vue";
---

<MainLayout title="Mars { } Rover">
  <MyComponent client:only />
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

Inside of your Astro project you will see the following folders and files:

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
├── .gitignore
├── .prettierrc.mjs
├── astro.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

When deployed with the custom `New-AstroProject` PowerShell function, you will see the following folders and files:

```text
/
├── .vscode/
│       └── extensions.json
│       └── launch.json
│       └── settings.json
├── public/
│       └── favicon.svg
├── src/
|   ├── assets/
|   ├── components/
|   ├── layouts/
│       └── MainLayout.astro
│   ├── pages/
│       └── index.astro
|   ├── styles/
│       └── global.css
├── .gitignore
├── .prettierrc.mjs
├── astro.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```
