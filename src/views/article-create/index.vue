<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      ></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown
            :title="title"
            :detail="detail"
            @onSuccess="CreateSuccess"
          />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <!-- <Editor :show="isShow" /> -->
          <!-- 使用v-if 实现动态切换富文本编辑器语言 -->
          <Editor
            :title="title"
            :detail="detail"
            :EditorHtml="EditorHtml"
            @onSuccess="CreateSuccess"
            v-if="isShow"
            @onRendering="RenderingComponents"
          />
          <Editor
            :title="title"
            :detail="detail"
            :EditorHtml="EditorHtml"
            @onSuccess="CreateSuccess"
            v-else
            @onRendering="RenderingComponents"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { articleDetail } from '@/api/article'
import { onActivated, ref } from 'vue'
import { useRoute } from 'vue-router'
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'

const title = ref('')
const activeName = ref('editor')
const CreateSuccess = () => {
  title.value = ''
  console.log('成功')
}

// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
// 获取文章详情
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}

// 控制是否展示组件
const isShow = ref(true)
const EditorHtml = ref('')
// 更改数据重新渲染数据
const RenderingComponents = (val) => {
  // 实现动态切换富文本编辑器
  isShow.value = !isShow.value
  // 向子组件(编辑器)传递原有的内容
  EditorHtml.value = val
}

if (articleId) {
  // 用于 <KeepAlive> 缓存
  onActivated(getArticleDetail)
}
</script>

<style lang="scss" scoped>
.title-input {
  border: 0.01rem solid #ccc;
  margin-bottom: 0.2rem;
}
</style>
