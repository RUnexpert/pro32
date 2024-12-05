<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["arr", "placeholder", "modelValue"]);
const selectedValue = ref("");

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  },
);

const onChangeHandler = () => {
  emit("update:modelValue", selectedValue.value);
};
</script>

<template>
  <div class="form-group">
    <select
      class="form-select form-select-lg mb-3 w-75"
      aria-label=".form-select-lg example"
      v-model="selectedValue"
      @change="onChangeHandler"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="elem in arr" :key="elem" :value="elem">
        {{ elem }}
      </option>
    </select>
  </div>
</template>
