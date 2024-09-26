import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
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
    menuList: [],
    token: "",
    routerList: [],
  };
}
export const useAllDataStore = defineStore("allData", () => {
  //ref state
  //computed getters
  //function actions

  const state = ref(initState());

  watch(
    state,
    (newObj) => {
      if (newObj.token) return;
      localStorage.setItem("store", JSON.stringify(newObj));
    },
    { deep: true }
  );
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
  function updateMenuList(menuList) {
    state.value.menuList = menuList;
  }
  function addMenu(router, type) {
    if (type === "refresh") {
      if (JSON.parse(localStorage.getItem("store"))) {
        state.value = JSON.parse(localStorage.getItem("store"));
        state.value.routerList = [];
      } else {
        return;
      }
    }
    const menu = state.value.menuList;
    const module = import.meta.glob("../views/**/*.vue");
    const routeArr = [];
    menu.forEach((item) => {
      if (item.children) {
        item.children.forEach((val) => {
          let url = `../views/${val.url}.vue`;
          val.computed = module[url];
          routeArr.push(...item.children);
        });
      } else {
        let url = `../views/${item.url}.vue`;
        item.component = module[url];
        routeArr.push(item);
      }
    });
    state.value.routerList = [];
    console.log(router.getRoutes());
    let routers = router.getRoutes();
    routers.forEach((item) => {
      if (item.name == "main" || item.name == "login") {
        return;
      } else {
        router.removeRoute(item.name);
      }
    });
    routeArr.forEach((item) => {
      state.value.routerList.push(router.addRoute("main", item));
    });
  }
  function clean() {
    state.value.routerList.forEach((item) => {
      console.log(item);
      if (item) {
        item();
      }
    });
    state.value = initState();
    //删除我们本地的缓存
    localStorage.removeItem("store");
  }
  return {
    state,
    selectMenu,
    undateTags,
    updateMenuList,
    addMenu,
    clean,
  };
});
