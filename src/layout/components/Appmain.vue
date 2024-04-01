<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { isTags } from '@/utils/tags'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

const route = useRoute()
const store = useStore()
// 监听路由变化
watch(
  route,
  (to, from) => {
    // 判断tag是否需要被缓存
    if (!isTags(to.path)) return
    // 需要被缓存
    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
// 监听国际化 tags
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsViewList', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>

<style lang="scss" scoped>
@import '~@/styles/transition.scss';

.app-main {
  min-height: calc(100vh - 0.5rem - 0.43rem);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 1.04rem 0.2rem 0.2rem 0.2rem;
  box-sizing: border-box;
}
</style>
