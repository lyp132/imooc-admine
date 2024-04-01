<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermissions"
        border
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <!-- 权限名称 -->
        <el-table-column
          :label="$t('msg.permission.name')"
          prop="permissionName"
          width="180"
        ></el-table-column>
        <!-- 权限标识 -->
        <el-table-column
          :label="$t('msg.permission.mark')"
          prop="permissionMark"
          width="180"
        ></el-table-column>
        <!-- 权限描述 -->
        <el-table-column
          :label="$t('msg.permission.desc')"
          prop="permissionDesc"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

/**
 * 权限分级：
 * 1. 一级权限为页面权限
 *  permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 *  permissionMark 对应 功能权限表
 */
// 所有权限
// 定义权限列表数据
const allPermissions = ref([])
// 获取权限列表数据
const getPermissionList = async () => {
  allPermissions.value = await permissionList()
  // console.log(allPermissions.value)
}
getPermissionList()

// 监听语言变化，重新计算数据源
watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped></style>
