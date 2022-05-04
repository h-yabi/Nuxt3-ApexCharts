import { defineNuxtConfig } from 'nuxt';
const API_URL = process.env.API_URL;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  router: {
    base: '/Nuxt3-ApexCharts/',
  },
  generate: {
    dir: 'docs',
  },
  typescript: {
    strict: true,
  },
  vite: {
    server: {
      proxy: {
        '/api/': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
  publicRuntimeConfig: {
    API_URL,
  },
});
