<template>
  {{ config.API_URL }}
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const config = useRuntimeConfig();
// import axios from 'axios';
const API_URL = config.API_URL;
console.log(API_URL);

onMounted(() => {
  console.log(process);
  // const data = axios.get;
});
</script>

<style scoped></style>
