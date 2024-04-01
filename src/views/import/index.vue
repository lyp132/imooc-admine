<template>
  <div>
    <UploadExcel :onSuccess="onSuccess" />
  </div>
</template>

<script setup>
import { userBatchImport } from '@/api/user-manage'
import UploadExcel from '@/components/UploadExcel'
import { ElMessage } from 'element-plus'
import {} from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { USER_RELATIONS, formatDate } from './utils'

const i18n = useI18n()
const router = useRouter()

const onSuccess = async ({ results }) => {
  // console.log(results)
  // 将解析后的数据转换为能够上传的数据
  const uploadData = generateData(results)
  // console.log(uploadData)
  // 上传数据
  await userBatchImport(uploadData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}

/**
 * 筛选数据
 * @param {*} results
 */
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  // console.log(arr)
  return arr
}
</script>

<style lang="scss" scoped></style>
