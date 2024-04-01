<template>
  <el-dialog title="提示" :model-value="modelValue" @close="closed" width="22%">
    <!-- 内容 -->
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="myColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { ref } from 'vue'
import { useStore } from 'vuex'

defineProps({
  modelValue: {
    type: Boolean,
    requied: true
  }
})
const emit = defineEmits(['update:modelValue'])
const store = useStore()

// 预定义颜色
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]
// 默认色值
const myColor = ref(store.getters.mainColor)

// Dialog 关闭触发的回调函数
const closed = () => {
  emit('update:modelValue', false)
}
// Dialog 确定触发的回调函数
const confirm = async () => {
  const newStyleText = await generateNewStyle(myColor.value)
  writeNewStyle(newStyleText)
  // 保存主题色到vuex和本地缓存中
  store.commit('theme/setMainColor', myColor.value)
  // closed()
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 0.12rem;
  }
}
</style>
