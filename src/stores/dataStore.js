import { defineStore } from "pinia";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    dataArray: [],
  }),

  actions: {
    setDataArray(newArray) {
      this.dataArray = newArray;
    },

    clearDataArray() {
      this.dataArray = [];
    },
  },
});
