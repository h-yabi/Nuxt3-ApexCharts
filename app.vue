<template>
  <Head>
    <Title>{{ TITLE }}</Title>
    <Meta name="description" :content="DESCRIPTION" />
  </Head>

  <Loading v-if="isLoading" />
  <div v-else class="contents">
    <div class="countries-data-wrap">
      <SelectCountries
        v-if="mostRecentData.length"
        :country="country"
        @select-country="selectCountry"
      />
      <MostRecentData :most-recent-data="mostRecentData" />
    </div>
    <CountriesData :all-countries-data="allCountriesData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TITLE, DESCRIPTION } from '@/static/constants.js';
import dayjs from 'dayjs';
import axios from 'axios';
import dataJson from '@/types/data.json';
import Loading from '@/components/Loading.vue';
import SelectCountries from '@/components/SelectCountries.vue';
import MostRecentData from '@/components/MostRecentData.vue';
import CountriesData from '@/components/CountriesData.vue';

// 型情報
type DATA_TYPE = typeof dataJson;

// 直近のデータ
const mostRecentData = ref<DATA_TYPE[]>([]);

// 全ての国のデータ（日付指定）
const allCountriesData = ref<DATA_TYPE[]>([]);

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
  mostRecentData.value = itemList;
};

// 全ての国のデータ
const getAllCountriesData = async () => {
  const date = dayjs().subtract(2, 'days').format('YYYYMMDD');
  const apiData = await axios.get(`/api/?date=${date}`);
  const itemList = apiData.data.itemList;
  allCountriesData.value = itemList;
};

const selectCountry = (selected: string) => {
  country.value = selected;
};
</script>

<style scoped lang="scss">
@import '@/src/assets/scss/_mixin.scss';

.contents {
  position: relative;
  padding: 30px 15px;
  @include pc {
    display: flex;
  }
}
.countries-data,
.countries-data-wrap {
  @include pc {
    width: 50%;
  }
}
.countries-data-wrap {
  position: relative;
  @include sp {
    margin-bottom: 30px;
  }
}
</style>
