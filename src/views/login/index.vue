<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select" effect="light" />
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          :type="passwordType"
          name="password"
          v-model="loginForm.password"
        />
        <span class="show-pwd">
          <span class="svg-container">
            <div @click="onChangePwdType">
              <svg-icon
                :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
              ></svg-icon>
            </div>
          </span>
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { validatePassword } from './rules'

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const i18n = useI18n()
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true, // 是否为必填项
      trigger: 'blur', // 验证逻辑的触发方式，blur鼠标移开时触发验证
      message: computed(() => {
        return i18n.t('msg.login.usernameRule')
      }) // 提示
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 处理密码框文本显示
const passwordType = ref('password')

/**
 * 点击时改变密码框文本显示状态
 */
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
// 是否为加载中状态
const loading = ref(false)
// 获取 el-form 组件实例
const loginFormRef = ref(null)
// 获取vuex实例
const store = useStore()
const handleLogin = () => {
  // 1.进行表单校验
  loginFormRef.value.validate((valid) => {
    if (!valid) return

    // 2.触发登录动作
    loading.value = true
    // 触发登录的 action
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // 进行登录后操作
        // console.log(store.state)
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
  // 3.进行登录后处理
}
</script>

<style lang="scss" scoped>
// 背景颜色
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
// 光标颜色
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 5.2rem;
    max-width: 100%;
    padding: 1.6rem 0.35rem 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 0.01rem solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 0.05rem;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 0.47rem;
      width: 85%;

      input {
        background: transparent;
        border: none;
        border-radius: 0;
        padding: 0.12rem 0.05rem 0.12rem 0.15rem;
        color: $light_gray;
        height: 0.47rem;
        caret-color: $cursor;
      }
    }
    :deep(.tips) {
      color: #fff;
      font-size: 0.16rem;
      line-height: 0.28rem;
      margin-bottom: 0.1rem;
    }
  }
  .svg-container {
    padding: 0.06rem 0.05rem 0.06rem 0.15rem;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 0.26rem;
      color: $light_gray;
      margin: 0 auto 0.4rem;
      text-align: center;
      font-weight: bold;
    }
    :deep(.lang-select) {
      position: absolute;
      top: 0.04rem;
      right: 0;
      background-color: #fff;
      font-size: 0.22rem;
      padding: 0.04rem;
      border-radius: 0.04rem;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 0.1rem;
    font-size: 0.16rem;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
