<template>
  <div class="user-manage-container">
    <!-- excel 导入与导出 -->
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
          >{{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onExportToExcelClick">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <!-- 员工详情 -->
    <el-card class="user-detail">
      <el-table :data="tableData" border style="width: 100%">
        <!-- # -->
        <el-table-column label="#" type="index"></el-table-column>
        <!-- 姓名 -->
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <!-- 联系方式 -->
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar"></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{
                item.title
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 开通时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            <!-- 使用全局属性处理时间解析 -->
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <!-- 查看 -->
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <!-- 角色 -->
            <el-button
              type="info"
              size="small"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              size="small"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <ExportToExcel v-model="exportToExcelVisible" />
      <RolesDialog
        v-model="roleDialogVisible"
        :userId="selectUserId"
        @updateRole="getListData"
      />
    </el-card>
  </div>
</template>

<script setup>
import { deleteUser, getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ExportToExcel from './components/ExportToExcel.vue'
import RolesDialog from './components/RolesDialog.vue'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

// 获取数据
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  // console.log(result)
  total.value = result.total
  // 员工列表数据
  tableData.value = result.list
}
getListData()
// 监听语言切换
watchSwitchLang(getListData)
// 处理导入用户后数据不重新加载的问题
onActivated(getListData)

// 分页相关
/**
 * size改变触发事件
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
/**
 * 页码改变触发事件
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

const router = useRouter()
// excel导入点击事件
const onImportExcelClick = () => {
  router.push('/user/import')
}

const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

const i18n = useI18n()
/**
 * 删除按钮点击事件
 */
const onRemoveClick = (row) => {
  // console.log(row)
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    i18n.t('msg.excel.Warning'),
    {
      type: 'warning'
    }
  )
    .then(async () => {
      // 删除用户
      await deleteUser(row._id)
      ElMessage.success(i18n.t('msg.excel.removeSuccess'))
      // 重新渲染数据
      getListData()
    })
    .catch(() => {
      ElMessage.error(i18n.t('msg.excel.UndeleteUser'))
    })
}

// 控制dialog弹出层是否展示
const exportToExcelVisible = ref(false)
const roleDialogVisible = ref(false)
// 点击导出excel按钮
const onExportToExcelClick = () => {
  exportToExcelVisible.value = true
}
// 查看角色点击事件
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}
// 监听弹窗变化，清空userId
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  .user-detail {
    :deep(.el-pagination) {
      justify-content: center;
    }
  }
}
</style>
