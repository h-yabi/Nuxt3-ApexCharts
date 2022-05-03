<template>test</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
const config = useRuntimeConfig();
const TOKYO_COVID_CSV = config.TOKYO_COVID_CSV;

onMounted(async () => {
  const { data } = await axios.get(`/api/${TOKYO_COVID_CSV}`);
  console.log(data);
});
</script>

<style scoped></style>
