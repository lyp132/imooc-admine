<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <!-- 按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor'
import { onMounted, watch } from 'vue'
// Step 1 : Import language file
import { watchSwitchLang } from '@/utils/i18n'
import '@toast-ui/editor/dist/i18n/zh-cn'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import { useStore } from 'vuex'
import { commitArticle, editArticle } from './commit'

// console.log('MKEditor', MKEditor)
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})
const emits = defineEmits(['onSuccess'])

// 定义Editor实例
let mkEditor
// 定义要渲染的dom元素
let el
// dom渲染完成调用初始化markdown 方法
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initMKEditor()
})

const store = useStore()
// 初始化markdown
const initMKEditor = () => {
  mkEditor = new MKEditor({
    el,
    // 高度
    height: '500px',
    // 样式
    previewStyle: 'vertical',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

// 监听语言变化
watchSwitchLang(() => {
  if (!el) return
  // 拿到用户输入的内容
  const htmlStr = mkEditor.getHTML()
  // 清理掉mkEditor
  mkEditor.destroy()

  initMKEditor()
  // 渲染用户输入的内容
  mkEditor.setHTML(htmlStr)
})

// 点击提交按钮
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  // console.log(mkEditor.getHTML())
  // 清空用户输入的内容
  mkEditor.reset()
  console.log('点击提交')
  emits('onSuccess')
}

// 监听数据变化
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      // 渲染内容
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 0.2rem;
    text-align: right;
  }
}
</style>
