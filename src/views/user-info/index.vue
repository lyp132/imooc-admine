<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="PrintLoading" v-print="printObj">{{
        $t('msg.userInfo.print')
      }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <!-- 标题 -->
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">{{
              detailData.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">{{
              detailData.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">{{
              detailData.nationality
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{
              detailData.mobile
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">{{
              detailData.province
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">{{
              $filters.dateFilter(detailData.openTime)
            }}</el-descriptions-item>
            <el-descriptions-item
              class="remark"
              :label="$t('msg.userInfo.remark')"
              span="2"
            >
              <el-tag v-for="(item, index) in detailData.remark" :key="index">{{
                item
              }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item
              :label="$t('msg.userInfo.address')"
              span="2"
              >{{ detailData.address }}</el-descriptions-item
            >
          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
            class="avatar"
            :src="detailData.avatar"
            :preview-src-list="[detailData.avatar]"
          ></el-image>
        </div>
        <!-- 内容渲染表格 -->
        <div class="body">
          <el-descriptions :column="1" direction="vertical" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span
                    >{{ $filters.dateFilter(item.startTime, 'YYYY/MM') }} ---
                    {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}</span
                  >
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- 尾部签名 -->
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { userDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const detailData = ref({})
const getUserDetail = async () => {
  // 获取指定员工信息
  detailData.value = await userDetail(props.id)
  console.log(detailData.value)
}
getUserDetail()
// 监听语言切换
watchSwitchLang(getUserDetail)

const PrintLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'imooc-vue-element-admin',
  beforeOpenCallback(vue) {
    PrintLoading.value = true
    console.log('打开之前')
  },
  openCallback(vue) {
    PrintLoading.value = false
    console.log('执行了打印')
  },
  closeCallback(vue) {
    console.log('关闭了打印工具')
  }
}
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 0.2rem;
  text-align: right;
}
.user-info-box {
  max-width: 10.24rem;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 0.18rem;
    font-size: 0.24rem;
  }
  .header {
    display: flex;
    :deep(.el-descriptions) {
      flex-grow: 1;
    }
    .avatar {
      width: 1.87rem;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 0.12rem;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 0.62rem;
        }
      }
    }
  }
  .foot {
    margin-top: 0.42rem;
    text-align: right;
    font-size: 0.16rem;
  }
}
</style>
