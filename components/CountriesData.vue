<template>
  <div class="countries-data">
    <BarChart v-bind="barChartProps" :height="12000" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { BarChart, useBarChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { COUNTRIES_TITLE } from '@/static/constants.js';
import dataJson from '@/types/data.json';
Chart.register(...registerables);

// 型情報
type DATA_TYPE = typeof dataJson;

type Props = {
  allCountriesData: DATA_TYPE[];
};

const toggleLegend = ref(true);
const props = defineProps<Props>();

// 文字列型の数字（"7,901,933"）内にあるカンマを削除
const removedComma = (data: string) => {
  return data.replace(/,/g, '');
};

// 感染者数 - infectedNum
const infectedValues = ref<number[]>([]);
infectedValues.value = props.allCountriesData.map((d: DATA_TYPE) =>
  Number(removedComma(d.infectedNum))
);

// 死亡者数 - deceasedNum
const deadValues = ref<number[]>([]);
deadValues.value = props.allCountriesData.map((d: DATA_TYPE) =>
  Number(removedComma(d.deceasedNum))
);

// 国名
const countries = ref<string[]>([]);
countries.value = props.allCountriesData.map((d: DATA_TYPE) => d.dataName);

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: countries.value,
  datasets: [
    {
      label: '感染者数',
      data: infectedValues.value,
      backgroundColor: ['rgba(0, 0, 255, 0.5)'],
    },
    {
      label: '死亡者数',
      data: deadValues.value,
      backgroundColor: ['rgba(255, 0, 0, 0.3)'],
    },
  ],
}));

const options = computed<ChartOptions<'bar'>>(() => ({
  indexAxis: 'y',
  scales: {
    myScale: {
      type: 'logarithmic',
      position: toggleLegend.value ? 'top' : 'bottom',
    },
  },
  plugins: {
    title: {
      display: true,
      text: COUNTRIES_TITLE,
      font: {
        size: 20,
      },
      padding: {
        top: 20,
        bottom: 10,
      },
    },
  },
}));

const { barChartProps } = useBarChart({
  chartData,
  options,
});
</script>

<style scoped lang="scss">
.countries-data {
  max-height: 480px;
  overflow-y: scroll;
  div {
    left: -100px;
  }
}
</style>
