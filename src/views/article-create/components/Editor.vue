<template>
  <div class="editor-container">
    <div id="editor-box">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

// import { onBeforeUnmount, shallowRef, watch } from 'vue'
import { onBeforeUnmount, shallowRef, ref, watch, computed } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { i18nChangeLanguage } from '@wangeditor/editor'
import { useStore } from 'vuex'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  },
  EditorHtml: {
    type: String
  }
})
const emits = defineEmits(['onRendering', 'onSuccess'])

const store = useStore()
// console.log(Editor, Toolbar)
const lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
i18nChangeLanguage(lang)

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')
const mode = 'default'

// // 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//   }, 1500)
// })

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor, val) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// console.log(
//   '111',
//   props.EditorHtml,
//   '222',
//   editorRef.value,
//   '333',
//   valueHtml.value,
//   '444'
// )
// Vue采用单向数据流，我们不能直接去更改props的值，需要去使用computed去接收
const PropEditorHtml = computed(() => {
  return props.EditorHtml
})
if (props.Html) {
  // console.log('PropHtml', PropEditorHtml)
  // 切换语言重新渲染编辑器时渲染用户输入的内容
  valueHtml.value = PropEditorHtml.value
} else {
  valueHtml.value = '<p>hello</p>'
}

// 点击提交
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 存在文章ID，则编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editorRef.value.getHtml()
    })
  } else {
    // 不存在文章ID，则新建文章
    await commitArticle({
      title: props.title,
      content: editorRef.value.getHtml()
    })
  }
  // 清空内容
  editorRef.value.setHtml('')
  emits('onSuccess')
  console.log('点击提交')
}
// 监听语言变化
watchSwitchLang(() => {
  emits('onRendering', valueHtml.value)
  // console.log('监听语言变化', valueHtml.value)
})

// 监听数据变化
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      // 渲染文章内容
      editorRef.value.setHtml(val.content)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 0.2rem;
    text-align: right;
  }
}
</style>
