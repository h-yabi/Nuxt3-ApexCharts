<template>
  <div class="cp_ipselect cp_sl01">
    <select name="" id="" v-model="selected" @change="selectCountry">
      <option
        v-for="(country, index) in countries"
        :value="country"
        :key="index"
      >
        {{ country }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

type Props = {
  country: string;
};

const props = defineProps<Props>();
const selected = ref<string>(props.country);
const countries = [
  '日本',
  '米国',
  '中国',
  '韓国',
  'フランス',
  'ドイツ',
  'イタリア',
  'フィリピン',
  'スペイン',
  'ブラジル',
];

const emit = defineEmits(['select-country']);
const selectCountry = () => {
  emit('select-country', selected.value);
};
</script>

<style scoped>
.cp_ipselect {
  overflow: hidden;
  width: 20%;
  margin: 2em auto;
  padding: 10px;
  text-align: center;
}
.cp_ipselect select {
  width: 100%;
  padding-right: 1em;
  cursor: pointer;
  text-indent: 0.01px;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;
  background-image: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
}
.cp_ipselect select::-ms-expand {
  display: none;
}
.cp_ipselect.cp_sl01 {
  position: relative;
  border-radius: 2px;
  border: 2px solid #ccc;
  border-radius: 50px;
  background: #ffffff;
}
.cp_ipselect.cp_sl01::before {
  position: absolute;
  top: 45%;
  right: 1.8em;
  width: 0;
  height: 0;
  padding: 0;
  content: '';
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #ccc;
  pointer-events: none;
}
.cp_ipselect.cp_sl01 select {
  padding: 8px 38px 8px 8px;
  color: black;
}
</style>
