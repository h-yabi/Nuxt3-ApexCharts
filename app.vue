<template>
  <div v-if="isLoading">Loading…</div>
  <div v-else>
    <BarChart v-bind="barChartProps" />
    {{ data }}
  </div>
  <!-- {{ getDate }} -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';

import { BarChart, useBarChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

const now = dayjs();
const getDate = dayjs().subtract(1, 'days').format('YYYY-MM-DD');
console.log(getDate);

const dataValues = ref([30, 40, 60, 70, 15]);
const dataLabels = ref(['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre']);

const testData = computed<ChartData<'bar'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}));

const options = computed<ChartOptions<'bar'>>(() => ({
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'covid19',
    },
  },
}));

const { barChartProps, barChartRef } = useBarChart({
  chartData: testData,
  options,
});

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
