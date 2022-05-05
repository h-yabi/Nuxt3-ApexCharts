<template>
  <div class="loading">
    <img src="@/src/assets/loading.gif" alt="" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
}
.loading img {
  max-width: 100px;
  margin: auto;
}
</style>
