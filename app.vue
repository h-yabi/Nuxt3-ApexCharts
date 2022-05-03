<template>
  <div>{{ data }}</div>
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

onMounted(async () => {
  const apiData = await axios.get(`/api/${country}`);
  data.value = apiData.data;
});
</script>

<style scoped></style>
