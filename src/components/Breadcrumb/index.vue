<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!-- 面包屑的最后一项 -->
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbData"
        :key="item.path"
      >
        <!-- 可点击项 -->
        <span
          v-if="index !== breadCrumbData.length - 1"
          class="redirect"
          @click.prevent="OnLinkClick(item)"
          >{{ generateTitle(item.meta.title) }}</span
        >
        <!-- 不可点击项 -->
        <span v-else class="no-redirect">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'
// 生成数组数据
const breadCrumbData = ref([])
/**
 * 获取面包屑所需内容
 */
const getBreadcrumbData = () => {
  // console.log(route.matched)
  breadCrumbData.value = route.matched.filter(
    (item) => item.meta.icon && item.meta.title
  )
}

// 监听路由变化
const route = useRoute()
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true }
)

// 处理点击事件
const router = useRouter()
const OnLinkClick = (item) => {
  router.push(item.path)
}

// 将来需要进行主题替换，所以这里获取下动态样式
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
@import '~@/styles/transition.scss';

.breadcrumb {
  display: inline-block;
  line-height: 0.5rem;
  font-size: 0.14rem;
  margin-left: 0.08rem;
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
  }
  // 鼠标移入
  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
</style>
