<template>
  <LineChart v-bind="lineChartProps" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);

type Props = {
  infectedValues: number[];
  deadValues: number[];
  dates: string[];
};

const toggleLegend = ref(true);
const props = defineProps<Props>();

const testData = computed<ChartData<'line'>>(() => ({
  labels: props.dates,
  datasets: [
    {
      label: 'Demo line plot',
      data: props.infectedValues,
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
    },
    {
      label: 'Demo line plot',
      data: props.deadValues,
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
