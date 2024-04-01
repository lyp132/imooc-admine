<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <!-- 查看按钮 -->
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Pagination 分页  -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { deleteArticle, getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { initSortable, tableRef } from './sortable'

// 数据相关
const tableData = ref([])
// 页码
const page = ref(1)
// 每页条数
const size = ref(10)
// 总条数
const total = ref(0)

const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  // console.log(result)
  total.value = result.total
  tableData.value = result.list
}
// getListData()
// 监听语言变化,重新获取数据
watchSwitchLang(getListData)
// 处理数据不重新加载问题
onActivated(getListData)
onMounted(() => {
  initSortable(tableData, getListData)
})

/**
 * 每页条数改变时触发
 * @param {*} currentSize
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变时触发
 * @param {*} currentSize 页码值
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

/**
 * 查看文章详情
 * @param {*} row
 */
const router = useRouter()
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
  console.log('查看文章详情')
}

const i18n = useI18n()
/**
 * 删除文章
 * @param {*} row
 */
const onRemoveClick = (row) => {
  console.log('删除文章')
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    getListData()
  })
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
  }
  .pagination {
    margin-top: 0.2rem;
    justify-content: center;
  }
}
:deep(.sortable-ghost) {
  opacity: 0.6;
  color: #fff;
  background: #304156;
}
</style>
