<template>
  <div v-if="isLoading">Loading…</div>
  <div v-else>{{ data }}</div>
  {{ getDate }}
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';

const now = dayjs();
const getDate = dayjs().subtract(1, 'days').format('YYYY-MM-DD');
console.log(getDate);

const data = ref([]);
const country = 'japan';
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  const apiData = await axios.get(`/api/${country}`);
  data.value = apiData.data;
  isLoading.value = false;
});
</script>

<style scoped></style>
