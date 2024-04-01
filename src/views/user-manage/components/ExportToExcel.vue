<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span>
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button @click="onConfirm" type="primary" :loading="loading">
          {{ $t('msg.excel.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { getUserManageAllList } from '@/api/user-manage'
import { dateFilter } from '@/filters'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { USER_RELATIONS } from './Export2ExcelConstants'

// 处理输入框初始数据
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
// 定义输入框默认值
const excelName = ref('')
excelName.value = exportDefaultName
// 监听语言变化，重新计算数据源
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
const loading = ref(false)
/**
 * 取消
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}

/**
 * 确定导出excel
 */
const onConfirm = async () => {
  loading.value = true
  const result = await getUserManageAllList()
  // 获取用户数据列表 []
  const allUser = result.list
  // console.log('excel导出', allUser)
  // 动态导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  // 调用方法，完成excel导出
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS),
    // data必须为一个二维数组
    data,
    filename: excelName.value || exportDefaultName
  })
  // console.log(data)
  closed()
}
/**
 * 将数组转化未二维数组
 * @param {*} headers {} 数据对照表
 * @param {*} rows [] 用户列表数据
 */
const formatJson = (headers, rows) => {
  // 遍历数组，返回处理后得到的新的二维数组
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 处理时间格式
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
