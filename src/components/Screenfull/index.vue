<template>
  <div>
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="onToggle"
    ></svg-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { onMounted, onUnmounted, ref } from 'vue'

// 是否全屏
const isFullscreen = ref(false)
// 触发全屏事件
const onToggle = () => {
  // 实现全屏切换
  screenfull.toggle()
}
// 监听screenfull 的变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// 设置侦听器
onMounted(() => {
  //  on：绑定监听
  screenfull.on('change', change)
})
// 删除侦听器
onUnmounted(() => {
  // off: 取消监听
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
