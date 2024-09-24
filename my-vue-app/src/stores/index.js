import { ref, computed } from "vue";
import { defineStore } from "pinia";
function initState() {
  return {
    isCollapse: false,
    tags: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    currentMenu: null,
  };
}
export const useAllDataStore = defineStore("allData", () => {
  //ref state
  //computed getters
  //function actions

  const state = ref(initState());
  function selectMenu(item) {
    //如果是点击的首页，那就不需要设置currentMenu
    if (item.name == "home") {
      state.value.currentMenu = null;
    } else {
      //如果点击的不是首页，那就把这个设置为第二个面包屑
      let index = state.value.tags.findIndex((val) => val.name == item.name);
      if (index == -1) {
        state.value.tags.push(item);
      }
    }
  }
  function undateTags(tag) {
    let index = state.value.tags.findIndex((val) => val.name == tag.name);
    state.value.tags.splice(index, 1);
  }
  return {
    state,
    selectMenu,
    undateTags,
  };
});
