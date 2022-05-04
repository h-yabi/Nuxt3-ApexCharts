<template>
  <div v-if="isLoading">Loading…</div>
  <div v-else>
    <Line
      :infected-values="infectedValues"
      :dead-values="deadValues"
      :dates="dates"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import axios from 'axios';
import countryJson from './types/country.json';
import Line from './components/Line.vue';

// 型情報
type COUNTRY_TYPE = typeof countryJson;

// 感染者数 - infectedNum
const infectedValues = ref<number[]>([]);

// 死亡者数 - deceasedNum
const deadValues = ref<number[]>([]);

// 日付
const dates = ref<string[]>([]);

// 文字列型の数字（"7,901,933"）内にあるカンマを削除
const removedComma = (data: string) => {
  return data.replace(/,/g, '');
};

const country = '日本';
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  const apiData = await axios.get(`/api/?dataName=${country}`);

  // 取得したデータの日付を昇順にして返す
  const itemList = apiData.data.itemList.reverse();
  infectedValues.value = itemList.map((d: COUNTRY_TYPE) => {
    return Number(removedComma(d.infectedNum));
  });
  deadValues.value = itemList.map((d: COUNTRY_TYPE) => {
    return Number(removedComma(d.deceasedNum));
  });
  dates.value = itemList.map((d: COUNTRY_TYPE) =>
    dayjs(d.date).format('YYYY-MM-DD')
  );
  isLoading.value = false;
});

const now = dayjs();
const getDate = dayjs().subtract(1, 'days').format('YYYY-MM-DD');
</script>

<style scoped></style>
