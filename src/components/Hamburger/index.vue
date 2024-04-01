<template>
  <div class="hamburger-container" @click.stop="toggleClick">
    <svg-icon id="guide-hamburger" class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0.15rem 0.16rem;
  // height: 100%;
  float: left;
  cursor: pointer;
  // hover 动画
  transition: background 0.5s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .hamburger {
    :deep(.svg-icon) {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
