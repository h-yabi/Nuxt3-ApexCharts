<template>
  <div v-if="isLoading">Loading…</div>
  <div v-else>
    <LineChart v-bind="lineChartProps" />
    {{ data }}
  </div>
  <!-- {{ getDate }} -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';

import {
  DoughnutChart,
  LineChart,
  BarChart,
  useLineChart,
  useDoughnutChart,
} from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables);

const now = dayjs();
const getDate = dayjs().subtract(1, 'days').format('YYYY-MM-DD');
console.log(getDate);

const dataValues = ref([30, 40, 60, 70, 5]);
const dataLabels = ref(['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre']);
const toggleLegend = ref(true);

const testData = computed<ChartData<'line'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
    },
  ],
}));

const options = computed<ChartOptions<'line'>>(() => ({
  scales: {
    myScale: {
      type: 'logarithmic',
      position: toggleLegend.value ? 'left' : 'right',
    },
  },
  plugins: {
    legend: {
      position: toggleLegend.value ? 'top' : 'bottom',
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart',
    },
  },
}));

const { lineChartProps, lineChartRef } = useLineChart({
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
