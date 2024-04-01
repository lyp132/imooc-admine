<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { roleList } from '@/api/role'
import { updateRole, userRoles } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

// 定义所有角色数据
const allRoleList = ref([])
// 获取所有角色数据方法
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
// 监听语言切换
watchSwitchLang(getListData)

// 定义当前用户角色
const userRoleTitleList = ref([])
// 获取当前用户角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
  // console.log(userRoleTitleList.value)
}
// 监听userId变化，获取用户角色
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)

const emits = defineEmits(['update:modelValue', 'updateRole'])
// 关闭dialog
const closed = () => {
  emits('update:modelValue', false)
}
const i18n = useI18n()
// 确定按钮点击事件
const onConfirm = async () => {
  // 处理数据结构
  // map 遍历数组，返回一个新数组
  const roles = userRoleTitleList.value.map((title) => {
    // find 返回符合条件的对应项
    return allRoleList.value.find((role) => role.title === title)
  })
  // 发送请求更新用户角色
  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 给父组件传递消息
  emits('updateRole')
  closed()
}
</script>

<style lang="scss" scoped></style>
