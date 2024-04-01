<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
      class="tags-view-item"
      :class="isActive(tag, index) ? 'active' : ''"
      :style="{
        backgroundColor: isActive(tag, index)
          ? $store.getters.cssVar.menuBg
          : '',
        borderColor: isActive(tag, index) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <svg-icon
        icon="close"
        v-show="!isActive(tag)"
        class="el-icon-close"
        @click.prevent.stop="onCloseClick(index)"
      ></svg-icon>
    </router-link>
    <ContextMenu v-show="visible" :style="menuStyle" :index="selectIndex" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContextMenu from './ContextMenu.vue'

const route = useRoute()
const store = useStore()

// 判断是否被选中
const isActive = (tag, index) => {
  return tag.fullPath === route.path
}
// 点击tag关闭
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
  console.log('onCloseClick')
}

// contextMenu 相关
// 控制右键菜单栏是否展示
const visible = ref(false)
// 控制右键菜单栏展示位置
const menuStyle = ref({
  left: 0,
  top: 0
})
const selectIndex = ref(0)
/**
 * 点击鼠标右键时展示menu
 * @param {*} e 鼠标点击事件
 * @param {*} index tagslist项
 */
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  visible.value = true
  selectIndex.value = index
}
// 关闭 menu 右键菜单栏
const closeMenu = () => {
  visible.value = false
}
// 监听visible 变化，为body 绑定事件
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 0.34rem;
  width: 100%;
  background-color: #fff;
  border-bottom: 0.01rem solid #d8dce5;
  box-shadow: 0 0.01rem 0.03rem 0 rgba(0, 0, 0, 0.12),
    0 0.01rem 0.03rem 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 0.26rem;
    line-height: 0.26rem;
    border: 0.01rem solid #d8dce5;
    color: #495060;
    background-color: #fff;
    padding: 0 0.08rem;
    font-size: 0.12rem;
    margin-left: 0.05rem;
    margin-top: 0.04rem;
    &:first-of-type {
      margin-left: 0.15rem;
    }
    &:last-of-type {
      margin-right: 0.15rem;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      position: relative;
      top: 0.05rem;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
      :deep(.svg-icon) {
        vertical-align: 0.02rem;
      }
    }
  }
}
</style>
