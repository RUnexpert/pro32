<script setup>
import jsonData from "../assets/partners.json";
import TheSelect from "./UI/TheSelect.vue";
import TheTag from "./UI/TheTag.vue";
import TheButton from "./UI/TheButton.vue";
import { useDataStore } from "../stores/dataStore";
import { ref, onMounted } from "vue";

const dataStore = useDataStore();

const data = ref(jsonData);
const selectedCountry = ref("");
const selectedCity = ref("");
const selectedProductType = ref("");
const selectedProducts = ref([]);
const selectedPartnerTypes = ref([]);
const filteredData = ref([...data.value]);

const getUniqueValues = (data, key) => {
  if (key === "products" || key === "partnerType") {
    return Array.from(new Set(data.flatMap((item) => item[key])));
  } else {
    return Array.from(new Set(data.map((item) => item[key])));
  }
};

const uniqueCountries = ref(getUniqueValues(data.value, "country"));
const uniqueCities = ref(getUniqueValues(data.value, "city"));
const uniqueProductTypes = ref(getUniqueValues(data.value, "productType"));
const uniqueProducts = ref(getUniqueValues(data.value, "products"));
const uniquePartnerTypes = ref(getUniqueValues(data.value, "partnerType"));

const toggleProductType = (value) => {
  selectedProductType.value = value;
};

const toggleProduct = (value) => {
  if (selectedProducts.value.includes(value)) {
    selectedProducts.value = selectedProducts.value.filter(
      (item) => item !== value,
    );
  } else {
    selectedProducts.value.push(value);
  }
};

const togglePartnerProduct = (value) => {
  if (selectedPartnerTypes.value.includes(value)) {
    selectedPartnerTypes.value = selectedPartnerTypes.value.filter(
      (item) => item !== value,
    );
  } else {
    selectedPartnerTypes.value.push(value);
  }
};
const updateDataArray = () => {
  filteredData.value = data.value.filter((item) => {
    const matchesCountry = selectedCountry.value
      ? item.country === selectedCountry.value
      : true;
    const matchesCity = selectedCity.value
      ? item.city === selectedCity.value
      : true;
    const matchesProductType = selectedProductType.value
      ? item.productType === selectedProductType.value
      : true;
    const matchesProducts = selectedProducts.value.length
      ? selectedProducts.value.every((product) =>
          item.products.includes(product),
        )
      : true;
    const matchesPartnerType = selectedPartnerTypes.value.length
      ? selectedPartnerTypes.value.some((type) =>
          item.partnerType.includes(type),
        )
      : true;

    return (
      matchesCountry &&
      matchesCity &&
      matchesProductType &&
      matchesProducts &&
      matchesPartnerType
    );
  });

  dataStore.setDataArray(filteredData.value);
};

const clearFilters = () => {
  selectedCountry.value = "";
  selectedCity.value = "";
  selectedProductType.value = "";
  selectedProducts.value = [];
  selectedPartnerTypes.value = [];
  filteredData.value = [...data.value];
  dataStore.setDataArray(filteredData.value);
};

onMounted(() => {
  updateDataArray();
});
</script>

<template>
  <div class="block-container">
    <h4 class="fs-6 text-muted">Уточните адрес</h4>

    <the-select
      class="mt-4"
      :arr="uniqueCountries"
      placeholder="Страна"
      v-model="selectedCountry"
    ></the-select>

    <the-select
      class="mt-3"
      :arr="uniqueCities"
      placeholder="Город"
      v-model="selectedCity"
    ></the-select>

    <div class="block-container">
      <h4 class="fs-6 text-muted">Выберите тип продукта</h4>
      <div class="tags mt-3">
        <the-tag
          v-for="product in uniqueProductTypes"
          :text="product"
          :key="product"
          :value="product"
          :class="{ 'selected-tag': selectedProductType === product }"
          @click="toggleProductType(product)"
        ></the-tag>
      </div>
    </div>

    <div class="wrapper">
      <h4 class="fs-6 text-muted">Выберите продукт</h4>
      <div class="tags mt-3">
        <the-tag
          v-for="uniqProduct in uniqueProducts"
          :text="uniqProduct"
          :key="uniqProduct"
          :value="uniqProduct"
          :class="{ 'selected-tag': selectedProducts.includes(uniqProduct) }"
          @click="toggleProduct(uniqProduct)"
        ></the-tag>
      </div>
    </div>

    <div class="wrapper">
      <h4 class="fs-6 text-muted">Выберите тип партнёра</h4>
      <div class="tags mt-3">
        <the-tag
          v-for="uniqPartnerProduct in uniquePartnerTypes"
          :text="uniqPartnerProduct"
          :key="uniqPartnerProduct"
          :value="uniqPartnerProduct"
          :class="{
            'selected-tag': selectedPartnerTypes.includes(uniqPartnerProduct),
          }"
          @click="togglePartnerProduct(uniqPartnerProduct)"
        ></the-tag>
      </div>
    </div>

    <div class="d-flex mt-5 button-wrapper">
      <the-button
        class="outline-btn"
        text="Очистить"
        @click="clearFilters"
      ></the-button>

      <the-button
        class="fill-btn"
        text="Найти"
        @click="updateDataArray"
      ></the-button>
    </div>
  </div>
</template>

<style scoped>
.block-container {
  max-width: 400px;
  width: 100%;
}

.wrapper {
  margin-top: 30px;
}

.tags {
  max-width: 368px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.outline-btn {
  border: 2px solid var(--tag-bg-selected);
}

.fill-btn {
  border: none;
  background-color: var(--button-link-color);
}

.fill-btn:active {
  background: var(--button-link-color);
}

.selected-tag {
  color: #ffffff;
  background-color: var(--tag-bg-selected);
}

.button-wrapper {
  gap: 10px;
}
</style>
