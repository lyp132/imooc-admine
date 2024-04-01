<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermissions"
      :props="defaultProps"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
    ></el-tree>
    <template #footer
      ><span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span></template
    >
  </el-dialog>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { distributePermission, rolePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
// 定义el-tree配置选项
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
// 获取节点
const treeRef = ref(null)

// 获取当前用户角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  // 设置目前选中的节点，使用此方法必须设置 node-key 属性
  treeRef.value.setCheckedKeys(checkedKeys)
}
// 监听roleId变化，获取当前用户角色的权限
watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)

// 定义所有权限数据
const allPermissions = ref([])
// 获取权限列表
const getPermissionList = async () => {
  allPermissions.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)

const emits = defineEmits(['update:modelValue'])
/**
 * 关闭dialog弹窗
 */
const closed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
/**
 * dialog弹窗确定按钮点击事件
 */
const onConfirm = async () => {
  // 更新角色权限
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}
</script>

<style lang="scss" scoped></style>
