<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">{{ $t('msg.tagsView.refresh') }}</li>
    <li @click="onCloseRightClick">{{ $t('msg.tagsView.closeRight') }}</li>
    <li @click="onCloseOtherClick">{{ $t('msg.tagsView.closeOther') }}</li>
  </ul>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const router = useRouter()
const route = useRoute()
// 刷新
const onRefreshClick = () => {
  router.go(0)
}

const store = useStore()
// 关闭右侧tag项
const onCloseRightClick = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: props.index
  })
  // 判断tagsViewList 中是否存在当前路由
  const isTrue = store.getters.tagsViewList.filter((item) => {
    return item.fullPath === route.path
  })
  // 如果不存在，则跳转至当前点击项路由地址
  if (!isTrue.length) {
    router.push(store.getters.tagsViewList[props.index])
  }
}
// 关闭其他tag项
const onCloseOtherClick = () => {
  router.push(store.getters.tagsViewList[props.index])
  store.commit('app/removeTagsView', {
    type: 'other',
    index: props.index
  })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background-color: #fff;
  z-index: 3000;
  list-style-type: none;
  padding-top: 0.05rem;
  border-radius: 0.04rem;
  font-size: 0.12rem;
  font-weight: 400;
  color: #333;
  box-shadow: 0.02rem 0.02rem 0.03rem 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 0.07rem 0.16rem;
    cursor: pointer;
    border-bottom: 0.01rem solid #ccc;
    &:hover {
      background: #eee;
    }
  }
}
</style>
