<template>
  <div class="article-detail-container">
    <!-- 标题 -->
    <h2 class="title">{{ detail.title }}</h2>
    <!-- 头部 -->
    <div class="header">
      <span class="author">
        {{ $t('msg.article.author') }}：{{ detail.author }}
      </span>
      <span class="time">
        {{ $t('msg.article.publicDate') }}：{{
          $filters.relativeTime(detail.publicDate)
        }}
      </span>
      <el-button type="primary" class="edit" @click="onEditClick" link>{{
        $t('msg.article.edit')
      }}</el-button>
    </div>
    <!-- 内容 -->
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script setup>
import { articleDetail } from '@/api/article'
import { onActivated, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const articleId = route.params.id
const detail = ref({})
// 获取文章详情数据
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // console.log(detail.value)
}
// 调用时机为首次挂载
// 以及每次从缓存中被重新插入时
onActivated(getArticleDetail)
/**
 * 编辑按钮点击事件
 */
const router = useRouter()
const onEditClick = () => {
  router.push(`/article/editor/${articleId}`)
  console.log('编辑按钮点击事件')
}
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 0.22rem;
    text-align: center;
    padding: 0.12rem 0;
  }
  .header {
    padding: 0.26rem 0;
    font-size: 0.14rem;
    .author {
      color: #555666;
      margin-right: 0.2rem;
    }
    .time {
      color: #999aaa;
      margin-right: 0.2rem;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 0.14rem;
    padding: 0.2rem 0;
    border-top: 0.01rem solid #d4d4d4;
  }
}
</style>
