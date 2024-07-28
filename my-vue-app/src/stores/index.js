import { ref, computed } from "vue";
import { defineStore } from "pinia";
function initState() {
  return {
    isCollapse: false,
  };
}
export const useAllDataStore = defineStore("allData", () => {
  //ref state
  //computed getters
  //function actions

  const state = ref(initState());

  return {
    state,
  };
});
