<template>
  <el-config-provider :locale="lang">
    <router-view />
  </el-config-provider>
</template>
<script setup>
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import en from 'element-plus/dist/locale/en.mjs'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { watchSwitchLang } from './utils/i18n'

const store = useStore()
// 国际化
const lang = computed(() => (store.getters.language === 'en' ? en : zhCn))
generateNewStyle(store.getters.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})

// console.log(store.getters)
</script>
<style lang="scss"></style>
