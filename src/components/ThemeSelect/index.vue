<template>
  <!-- 主题图标 -->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')"
        ><svg-icon id="guide-theme" icon="change-theme"></svg-icon
      ></el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{
          $t('msg.theme.themeColorChange')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 -->
  <div>
    <SelectColor v-model="selectColorVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

// 控制dialog弹出层是否展示
const selectColorVisible = ref(false)
// 点击菜单项触发的事件回调
const handleSetTheme = (command) => {
  // console.log(command)
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
