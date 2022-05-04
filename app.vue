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
import countryJson from './types/country.json';

import { BarChart, useBarChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);

// 型情報
type COUNTRY_TYPE = typeof countryJson;

const data = ref([]);
const country = 'japan';
const isLoading = ref<boolean>(false);

// 感染者数
const infectedValues = ref<number[]>([]);

// 回復者数
const recoveredValues = ref<number[]>([]);

// 死亡者数
const deadValues = ref<number[]>([]);

// 日付
const date = ref<string[]>([]);

onMounted(async () => {
  isLoading.value = true;
  const apiData = await axios.get(`/api/${country}`);
  data.value = apiData.data;
  infectedValues.value = apiData.data.map((d: COUNTRY_TYPE) => d.Confirmed);
  recoveredValues.value = apiData.data.map((d: COUNTRY_TYPE) => d.Recovered);
  deadValues.value = apiData.data.map((d: COUNTRY_TYPE) => d.Deaths);
  date.value = apiData.data.map((d: COUNTRY_TYPE) =>
    dayjs(d.Date).format('YYYY-MM-DD')
  );

  isLoading.value = false;
});

const now = dayjs();
const getDate = dayjs().subtract(1, 'days').format('YYYY-MM-DD');
console.log(getDate);

// const date = ref(['感染者数', '回復者数', '死亡者数']);

const testData = computed<ChartData<'bar'>>(() => ({
  labels: date.value,
  datasets: [
    {
      data: infectedValues.value,
      backgroundColor: ['rgba(0, 0, 255, 0.5)'],
    },
    {
      data: recoveredValues.value,
      backgroundColor: ['#008080'],
    },
    {
      data: deadValues.value,
      backgroundColor: ['rgba(255, 0, 0, 0.5)'],
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
</script>

<style scoped></style>
