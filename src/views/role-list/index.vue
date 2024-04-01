<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <!-- 序号 -->
        <el-table-column
          :label="$t('msg.role.index')"
          type="index"
          width="120"
        ></el-table-column>
        <!-- 名称 -->
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <!-- 描述 -->
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <!-- 操作 -->
        <el-table-column :label="$t('msg.role.action')" width="200">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="onDistributePermissionClick(row)"
              v-permission="['distributePermission']"
              >{{ $t('msg.role.assignPermissions') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <DistributePermission
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    />
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'
import DistributePermission from './components/DistributePermission.vue'

// 定义用户列表数据
const allRoles = ref([])
// 获取用户列表数据
const getRoleList = async () => {
  allRoles.value = await roleList()
  console.log(allRoles.value)
}
getRoleList()
// 监听语言变化，重新计算数据源
watchSwitchLang(getRoleList)

// 控制dialog框是否展开
const distributePermissionVisible = ref(false)
// 定义角色ID
const selectRoleId = ref('')
// 点击分配权限按钮
const onDistributePermissionClick = (row) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
