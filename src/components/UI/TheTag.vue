<template>
  <button
    type="button"
    class="tag btn btn-dark active rounded-pill"
    @click="onChangeHandler"
  >
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps(["text", "value"]);
</script>

<style scoped>
.tag {
  border: none;
  background-color: var(--tag-bg-default);
  color: var(--tag-bg-selected);
}

.selected {
  background-color: var(--tag-bg-selected);
}
</style>
