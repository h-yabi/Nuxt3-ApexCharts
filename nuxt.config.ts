const environment = process.env.NODE_ENV;
const envSet = require(`./env.${environment}.js`);

import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  vite: {
    server: {
      proxy: {
        '/api/': {
          target: envSet.apiBaseUrl,
          secure: false,
        },
      },
    },
  },
});
