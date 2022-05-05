<template>
  <div class="most-recent-data">
    <BarChart v-bind="barChartProps" :height="500" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { BarChart, useBarChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { DAILY_TITLE } from '@/static/constants.js';
import dataJson from '@/types/data.json';
import dayjs from 'dayjs';
Chart.register(...registerables);

// 型情報
type DATA_TYPE = typeof dataJson;

type Props = {
  mostRecentData: DATA_TYPE[];
};

const toggleLegend = ref(true);
const props = defineProps<Props>();

// 文字列型の数字（"7,901,933"）内にあるカンマを削除
const removedComma = (data: string) => {
  return data.replace(/,/g, '');
};

// 感染者数 - infectedNum
const infectedValues = ref<number[]>([]);
const infectedNumbers = props.mostRecentData.map(
  (d: DATA_TYPE, index: number) => {
    let num;
    if (props.mostRecentData[index + 1] !== undefined) {
      num =
        Number(removedComma(d.infectedNum)) -
        Number(removedComma(props.mostRecentData[index + 1].infectedNum));
    } else {
      return 0;
    }
    return num;
  }
);
infectedValues.value = infectedNumbers.slice(0, -1);

// 死亡者数 - deceasedNum
const deadValues = ref<number[]>([]);
const deceasedNumbers = props.mostRecentData.map(
  (d: DATA_TYPE, index: number) => {
    let num;
    if (props.mostRecentData[index + 1] !== undefined) {
      num =
        Number(removedComma(d.deceasedNum)) -
        Number(removedComma(props.mostRecentData[index + 1].deceasedNum));
    } else {
      return 0;
    }
    return num;
  }
);
deadValues.value = deceasedNumbers.slice(0, -1);

// 国名
const datesArray = ref<string[]>([]);
datesArray.value = props.mostRecentData.map((d: DATA_TYPE) =>
  dayjs(d.date).format('YYYY-MM-DD')
);
datesArray.value = datesArray.value.slice(0, -1);

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: datesArray.value,
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
  type: 'line',
  scales: {
    myScale: {
      type: 'logarithmic',
      position: toggleLegend.value ? 'left' : 'right',
    },
  },
  plugins: {
    title: {
      display: true,
      text: DAILY_TITLE,
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
