<template>
  <div class="my-container">
    <!-- 创建基础网格布局layout -->
    <el-row>
      <el-col :span="6">
        <ProjectCard class="user-card" :features="featureData" />
      </el-col>
      <el-col :span="18">
        <!-- 卡片视图 -->
        <el-card>
          <!-- Tabs 标签页：Tabs 组件提供了选项卡功能， -->
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <!-- 功能 -->
              <Feature :features="featureData" /></el-tab-pane
            ><el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <!-- 章节 -->
              <Chapter /></el-tab-pane
            ><el-tab-pane :label="$t('msg.profile.author')" name="author">
              <!-- 作者 -->
              <Author
            /></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { feature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'
import Author from './components/Author.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import ProjectCard from './components/ProjectCard.vue'

const featureData = ref([])

// 获取项目功能数据
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()
// 监听语言切换：处理国际化问题
watchSwitchLang(getFeatureData)
const activeName = ref('feature')
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
    border: 0.01rem solid #000;
  }
}
</style>
