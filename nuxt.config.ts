import { defineNuxtConfig } from 'nuxt';
const TOKYO_COVID_CSV = process.env.TOKYO_COVID_CSV;
const API_BASE_URL = process.env.API_BASE_URL;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  vite: {
    server: {
      proxy: {
        '/api/': {
          target: API_BASE_URL,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
  publicRuntimeConfig: {
    API_BASE_URL,
    TOKYO_COVID_CSV,
  },
});
