<template>
  <div class="navbar">
    <Hamburger />
    <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />

    <div class="right-menu">
      <Guide class="right-menu-item hover-effect" />

      <!-- 搜索框 -->
      <HeaderSearch class="right-menu-item hover-effect" />
      <!-- 全屏展示 -->
      <Screenfull class="right-menu-item hover-effect" />
      <!-- 主题修改 -->
      <ThemeSelect class="right-menu-item hover-effect" />
      <!-- 国际化 -->
      <LangSelect class="right-menu-item hover-effect" />
      <!-- Dropdown 下拉菜单  -->
      <el-dropdown class="avatar-container">
        <!-- 触发菜单的元素 -->
        <div class="avatar-wrapper">
          <!-- Avatar 头像组件 -->
          <el-avatar
            class=""
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <el-icon><Tools /></el-icon>
          <!-- <svg-icon icon="tools"></svg-icon> -->
        </div>
        <!-- 插槽： dropdown -->
        <template #dropdown>
          <!-- 下拉列表，通常是 <el-dropdown-menu> 组件 -->
          <el-dropdown-menu class="user-dropdown">
            <!-- 下拉菜单的内容，子标签为Dropdown-Item -->
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a href="">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="handleLogout">{{
              $t('msg.navBar.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from '@/components/Breadcrumb'
import Guide from '@/components/Guide'
import Hamburger from '@/components/Hamburger'
import HeaderSearch from '@/components/HeaderSearch'
import LangSelect from '@/components/LangSelect'
import Screenfull from '@/components/Screenfull'
import ThemeSelect from '@/components/ThemeSelect'
import { Tools } from '@element-plus/icons-vue'
import {} from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const handleLogout = () => {
  console.log('退出登录')
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 0.5rem;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 0.01rem 0.04rem rgba(0, 21, 41, 0.08);
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 0.16rem;
    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 0.05rem;
        // position: relative;
        .el-avatar {
          margin-right: 0.12rem;
        }
      }
    }
    :deep(.right-menu-item) {
      display: inline-block;
      padding-right: 0.18rem;
      font-size: 0.24rem;
      color: #5a5e66;
      cursor: pointer;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
