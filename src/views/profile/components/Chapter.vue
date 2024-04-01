<template>
  <!-- 章节 -->
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        {{ item.content }}
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { chapter } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

// 定义项目章节数据
const chapterData = ref([])
// 获取项目章节数据
const getChapterData = async () => {
  chapterData.value = await chapter()
}
getChapterData()

// 监听语言切换：处理国际化问题
watchSwitchLang(getChapterData)
</script>

<style lang="scss" scoped></style>
