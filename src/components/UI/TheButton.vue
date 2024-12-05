<template>
  <button type="button" class="btn btn-lg">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps(["text", "value"]);
</script>

<style lang="scss" scoped></style>
