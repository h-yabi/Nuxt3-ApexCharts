import { defineNuxtConfig } from 'nuxt';
const API_URL = process.env.API_URL;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
