<template>
  <BarChart v-bind="barChartProps" />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { BarChart, useBarChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { TITLE, DESCRIPTION } from '@/static/constants.js';
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
      data: props.infectedValues,
      backgroundColor: ['rgba(0, 0, 255, 0.5)'],
    },
    {
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
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: TITLE,
      font: {
        size: 20,
      },
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    subtitle: {
      display: true,
      text: DESCRIPTION,
      font: {
        size: 16,
      },
      padding: {
        bottom: 20,
      },
    },
  },
}));

const { barChartProps } = useBarChart({
  chartData,
  options,
});
</script>

<style scoped></style>
