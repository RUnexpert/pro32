<script setup>
import { useDataStore } from "../stores/dataStore";

const dataStore = useDataStore();

const handleImageError = () => {
  // В json есть логотипы которых у меня нет.
  event.target.src = "/src/assets/img/EcoPack.png";
};
</script>

<template>
  <div class="card-wrapper">
    <div class="client-card" v-for="item in dataStore.dataArray" :key="item.id">
      <div class="left-side">
        <div class="logo">
          <img
            :src="'/src/assets/img/' + item.logo + '.png'"
            alt="Logo"
            @error="handleImageError"
          />
        </div>
        <div class="center-side">
          <h2 class="title">{{ item.name }}</h2>
          <div class="info">
            <a :href="'tel:' + item.phone" class="phone">{{ item.phone }}</a>
            <a :href="'mailto:' + item.email" class="email">{{ item.email }}</a>
            <a
              :href="'https://' + item.website"
              target="_blank"
              rel="noopener noreferrer"
              class="website"
              >{{ item.website }}</a
            >
          </div>
        </div>
      </div>

      <div class="status" :class="item.status === 'Start' ? 'light' : 'dark'">
        {{ item.status }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.client-card {
  padding: 42px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.client-card:first-child {
  padding-top: 0;
}

.client-card + .client-card {
  border-top: 1px solid #ccccd1;
}

.left-side {
  display: flex;
}

.logo {
  margin-right: 42px;
}

.title {
  font-family: "GoghBold";
  font-size: 20px;
  line-height: 27px;
}

.info {
  margin-top: 24px;
  display: flex;
}

.phone,
.email {
  margin-right: 24px;
}

.phone,
.email {
  text-decoration: none;
  color: var(--text-color);
}

.website {
  font-family: "GoghMedium";
  text-decoration: none;
  color: var(--button-link-color);
}

.status {
  display: flex;
  align-self: flex-start;
  padding: 4px 16px;
  font-size: 12px;
  border-radius: 30px;
  color: #ffffff;
}

.status.light {
  background-color: #9999a2;
}

.status.dark {
  background-color: var(--tag-bg-selected);
}
</style>
