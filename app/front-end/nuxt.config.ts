// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  // googleFonts: {
  //   families: {
  //     Poppins: [300, 400, 500, 600, 700]
  //   },
  //   display: 'swap',
  //   preload: true,
  //   download: true,
  // },
  css: [
    '@/assets/css/tailwind.css'
  ],
  postcss: {
  plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  
})