<template>
  <Head>
    <Title>{{ TITLE }}</Title>
    <Meta name="description" :content="DESCRIPTION" />
  </Head>
  <Loading v-if="isLoading" />
  <div v-else>
    <SelectCountries
      v-if="infectedValues.length"
      :country="country"
      @select-country="selectCountry"
    />
    <!-- <Line
      :infected-values="infectedValues"
      :dead-values="deadValues"
      :dates="dates"
    /> -->
    <MostRecentData
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
import { TITLE, DESCRIPTION } from '@/static/constants.js';
import dataJson from '@/types/data.json';
// import Line from '@/components/Line.vue';
import Loading from '@/components/Loading.vue';
import MostRecentData from '@/components/MostRecentData.vue';
import SelectCountries from '@/components/SelectCountries.vue';

// 型情報
type DATA_TYPE = typeof dataJson;

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
  (async () => {
    isLoading.value = true;
    await getMostRecentData();
    isLoading.value = false;
  })();
});

onMounted(async () => {
  isLoading.value = true;
  await getMostRecentData();
  await getAllCountriesData();
  isLoading.value = false;
});

// 直近10日間のデータ
const getMostRecentData = async () => {
  const apiData = await axios.get(`/api/?dataName=${country.value}`);
  const itemList = apiData.data.itemList.slice(0, 11);
  infectedValues.value = itemList.map((d: DATA_TYPE, index: number) => {
    let num;
    if (itemList[index + 1] !== undefined) {
      num =
        Number(removedComma(d.infectedNum)) -
        Number(removedComma(itemList[index + 1].infectedNum));
    }
    return num;
  });
  deadValues.value = itemList.map((d: DATA_TYPE, index: number) => {
    let num;
    if (itemList[index + 1] !== undefined) {
      num =
        Number(removedComma(d.deceasedNum)) -
        Number(removedComma(itemList[index + 1].deceasedNum));
    }
    return num;
  });
  const datesArray = itemList.map((d: DATA_TYPE) =>
    dayjs(d.date).format('YYYY-MM-DD')
  );
  dates.value = datesArray.slice(0, -1);
};

// 全ての国のデータ
const getAllCountriesData = async () => {
  const date = dayjs().subtract(2, 'days').format('YYYYMMDD');
  const apiData = await axios.get(`/api/?date=${date}`);
  console.log(apiData);
};

const selectCountry = (selected: string) => {
  country.value = selected;
};
</script>
