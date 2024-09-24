<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="handleMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useAllDataStore } from "@/stores";
import router from "@/router";
const store = useAllDataStore();
const tags = computed(() => store.state.tags);
const route = useRoute();
const handleMenu = (tag) => {
  router.push(tag.name);
  store.selectMenu(tag);
};
const handleClose = (tag, index) => {
  store.undateTags(tag);
};
</script>

<style lang="less" scoped>
.tags {
  margin: 20px 0 0 20px;
}
.el-tag {
  margin: 10px;
}
</style>
