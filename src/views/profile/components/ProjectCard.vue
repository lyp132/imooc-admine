<template>
  <!-- 项目介绍 -->
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>{{ $t('msg.profile.introduce') }}</span>
      </div>
    </template>
    <div class="user-profile">
      <!-- 头像 -->
      <div class="box-center">
        <PanThumb
          :image="$store.getters.userInfo.avatar"
          :width="'100px'"
          :height="'100px'"
        >
          <div>hello</div>
          {{ $store.getters.userInfo.title }}
        </PanThumb>
      </div>
      <!-- 姓名，角色 -->
      <div class="box-center">
        <div class="user-name">
          {{ $store.getters.userInfo.username }}
        </div>
        <div class="user-role">
          {{ $store.getters.userInfo.title }}
        </div>
      </div>
    </div>
    <div class="project">
      <div class="project-section">
        <div class="project-section-header">
          <svg-icon icon="introduce"></svg-icon>
          <span>{{ $t('msg.profile.projectIntroduction') }}</span>
        </div>
        <div class="project-section-body">
          <div class="text-muted">
            {{ $t('msg.profile.muted') }}
          </div>
        </div>
      </div>
      <div class="project-section">
        <div class="project-section-header">
          <svg-icon icon="introduce"></svg-icon>
          <span>{{ $t('msg.profile.projectFunction') }}</span>
        </div>
        <div class="project-section-body">
          <div class="progress-item" v-for="item in features" :key="item.id">
            <div>{{ item.title }}</div>
            <el-progress
              :percentage="item.percentage"
              status="success"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import PanThumb from '@/components/PanThumb'
import {} from 'vue'
// import { useStore } from 'vuex'

defineProps({
  // 获取项目功能数据
  features: {
    type: Array,
    required: true
  }
})

// const store = useStore()
// console.log(store.getters.userInfo)
</script>

<style lang="scss" scoped>
.user-container {
  .header {
    font-size: 0.16rem;
  }
  .user-profile {
    text-align: center;
    .box-center {
      padding-top: 0.1rem;
    }
    .user-name {
      font-size: 0.14rem;
      font-weight: bold;
    }
    .user-role {
      font-size: 0.14rem;
      padding-top: 0.1rem;
      font-weight: 400;
      color: #777;
    }
  }
  .project {
    margin-top: 0.2rem;
    color: #606266;
    span {
      padding-left: 0.04rem;
    }
    .project-section {
      margin-bottom: 0.36rem;
      &-header {
        font-size: 0.16rem;
        border-bottom: 0.01rem solid #ccc;
        padding-bottom: 0.1rem;
        margin-bottom: 0.1rem;
        font-weight: bold;
      }
      &-body {
        .text-muted {
          font-size: 0.14rem;
          column-rule: #777;
        }
        .progress-item {
          margin-top: 0.1rem;
          font-size: 0.14rem;
          div {
            margin-bottom: 0.02rem;
          }
        }
      }
    }
  }
}
</style>
