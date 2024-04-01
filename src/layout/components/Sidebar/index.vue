<template>
  <div>
    <div class="logo-container">
      <el-avatar
        shape="square"
        :size="44"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      ></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        imooc-admin
      </h1>
    </div>
    <el-scrollbar><SidebarMenu /></el-scrollbar>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import SidebarMenu from './SidebarMenu.vue'
const logoHeight = ref(0.5)

const logoHeightCssVal = computed(() => logoHeight.value + 'rem')
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeightCssVal);
  padding: 0.1rem 0 0.22rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo-title {
    margin-left: 0.1rem;
    font-size: 0.16rem;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }
}
</style>
