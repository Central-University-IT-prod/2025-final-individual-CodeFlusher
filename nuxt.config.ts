import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: ['assets/css/main.css', 'assets/css/imports.css', 'assets/css/colors.css'],
    ssr: false,
    vite: {
        plugins: [
            tailwindcss()
        ]
    },
    pinia: {
        storesDirs: ['./stores/**'],
    },
    modules: ['@nuxt/image', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt',]
})