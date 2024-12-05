<script setup>
import TheFilters from "./TheFilters.vue";
import TheList from "./TheList.vue";
</script>

<template>
  <div class="container">
    <div class="title-wrapper">
      <h1 class="title">Где купить</h1>
      <h3 class="subtitle">Контакты наших партнёров</h3>
    </div>
    <div class="block-wrapper">
      <the-filters></the-filters>
      <the-list></the-list>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1296px;
  margin: 0 auto;
}

.title-wrapper {
  text-align: center;
}

.title {
  font-family: "GoghBold";
  font-size: 46px;
  line-height: 55px;
  color: var(--tag-bg-selected);
}

.subtitle {
  margin-top: 24px;
  line-height: 30px;
}

.block-wrapper {
  padding-top: 67px;
  display: flex;
  justify-content: space-between;
}
</style>
