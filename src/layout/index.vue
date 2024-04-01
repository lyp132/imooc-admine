<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hiddenSidebar']"
  >
    <!-- 左侧menu 菜单 -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{
        backgroundColor: $store.getters.cssVar.menuBg
      }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部navbar -->
        <Navbar />
        <!-- tag标签栏 -->
        <TagsView id="guide-tags" />
      </div>
      <!-- 内容区 -->
      <Appmain />
    </div>
  </div>
</template>

<script setup>
import TagsView from '@/components/TagsView/index.vue'
import {} from 'vue'
import Appmain from './components/Appmain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
  // width: calc(100% - #{$sideBarWidth});
  width: 100%;
  transition: width $sideBarDuration;
}
.hiddenSidebar {
  :deep(.sidebar-container) {
    width: $hideSideBarWidth;
  }
  :deep(.main-container) {
    margin-left: $hideSideBarWidth;
  }
}
.openSidebar {
  :deep(.sidebar-container) {
    width: $sideBarWidth;
  }
  :deep(.main-container) {
    margin-left: $sideBarWidth;
  }
}
</style>
