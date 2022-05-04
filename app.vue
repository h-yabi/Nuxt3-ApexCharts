<template>
  <div v-if="isLoading">Loading…</div>
  <div v-else>
    <!-- <BarChart v-bind="barChartProps" /> -->
    <LineChart v-bind="lineChartProps" />
  </div>
  <!-- {{ getDate }} -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import countryJson from './types/country.json';

import { BarChart, LineChart, useBarChart, useLineChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);

// 型情報
type COUNTRY_TYPE = typeof countryJson;

const data = ref([]);
const country = '日本';
const isLoading = ref<boolean>(false);

// 感染者数 - infectedNum
const infectedValues = ref<number[]>([]);

// 死亡者数 - deceasedNum
const deadValues = ref<number[]>([]);

// 日付
const date = ref<string[]>([]);

// 文字列型の数字（"7,901,933"）内にあるカンマを削除
const removedComma = (data: string) => {
  return data.replace(/,/g, '');
};

onMounted(async () => {
  isLoading.value = true;
  // const apiData = await axios.get(`/api/${country}`);
  const apiData = await axios.get(`/api/?dataName=${country}`);
  const itemList = apiData.data.itemList;
  data.value = itemList.reverse();
  infectedValues.value = itemList.map((d: COUNTRY_TYPE) => {
    return Number(removedComma(d.infectedNum));
  });
  deadValues.value = itemList.map((d: COUNTRY_TYPE) => {
    return Number(removedComma(d.deceasedNum));
  });
  date.value = itemList.map((d: COUNTRY_TYPE) =>
    dayjs(d.date).format('YYYY-MM-DD')
  );

  isLoading.value = false;
});

const now = dayjs();
const getDate = dayjs().subtract(1, 'days').format('YYYY-MM-DD');
console.log(getDate);
const toggleLegend = ref(true);

// const date = ref(['感染者数', '回復者数', '死亡者数']);

const testData = computed<ChartData<'line'>>(() => ({
  labels: date.value,
  datasets: [
    {
      label: 'Demo line plot',
      data: infectedValues.value,
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
    },
    {
      label: 'Demo line plot',
      data: deadValues.value,
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
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
      display: false,
    },
    title: {
      display: true,
      text: 'covid19',
    },
  },
}));

const { lineChartProps, lineChartRef } = useLineChart({
  chartData: testData,
  options,
});
</script>

<style scoped></style>
