<template>
  <div v-if="isLoading">Loading…</div>
  <div v-else>
    <Countries :country="country" @select-country="selectCountry" />
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
import Countries from './components/Countries.vue';

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

const country = ref<string>('日本');
const isLoading = ref<boolean>(false);

watch(country, (newValue) => {
  country.value = newValue;
  getApiData();
});

onMounted(async () => {
  getApiData();
});

const getApiData = async () => {
  isLoading.value = true;
  const apiData = await axios.get(`/api/?dataName=${country.value}`);
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
};

const selectCountry = (selected: string) => {
  country.value = selected;
};

const now = dayjs();
const getDate = dayjs().subtract(1, 'days').format('YYYY-MM-DD');
</script>

<style scoped></style>
