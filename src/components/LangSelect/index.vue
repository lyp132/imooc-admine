<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon id="guide-lang" icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-item :disabled="language === 'zh'" command="zh"
        >中文</el-dropdown-item
      >
      <el-dropdown-item :disabled="language === 'en'" command="en"
        >English</el-dropdown-item
      >
    </template>
  </el-dropdown>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const store = useStore()
// 当前语言
const language = computed(() => store.getters.language)
const i18n = useI18n()
// 切换语言的方法
const handleSetLanguage = (lang) => {
  // 切换 i18n 的local
  i18n.locale.value = lang
  // 修改 vuex 中保存的language
  store.commit('app/setLanguage', lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped>
.international {
  display: inline-block;
  padding-right: 0.18rem;
  font-size: 0.24rem;
  color: #5a5e66;
  cursor: pointer;
}
</style>
