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
Chart.register(...registerables);

type Props = {
  infectedValues: number[];
  deadValues: number[];
  dates: string[];
};

const toggleLegend = ref(true);
const props = defineProps<Props>();

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.dates,
  datasets: [
    {
      label: '感染者数',
      data: props.infectedValues,
      backgroundColor: ['rgba(0, 0, 255, 0.5)'],
    },
    {
      label: '死亡者数',
      data: props.deadValues,
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
