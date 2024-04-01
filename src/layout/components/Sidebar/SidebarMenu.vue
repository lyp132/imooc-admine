<template>
  <el-menu
    :unique-opened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :router="true"
    :collapse="!$store.getters.sidebarOpened"
  >
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
    <!-- 一级menu菜单 -->
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>导航一</span>
      </template> -->
    <!-- 二级menu菜单 -->
    <!-- <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-sub-menu> -->
    <!-- <el-menu-item index="4">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>导航一</span>
      </template>
    </el-menu-item> -->
  </el-menu>
</template>

<script setup>
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
const router = useRouter()
const route = useRoute()
// 获取所有路由记录的完整列表[]
const allrouter = router.getRoutes()
const routes = computed(() => {
  const filterrouters = filterRouters(allrouter)
  return generateMenus(filterrouters)
})
// 默认激活项
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
