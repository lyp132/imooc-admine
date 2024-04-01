import { articleSort } from '@/api/article'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { ref } from 'vue'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper table > tbody'
  )[0]

  // 1: 要拖拽的元素
  // 2：配置对象
  Sortable.create(el, {
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束后的回调方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      // 修改文章排名
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success({
        message: i18n.global.t('msg.article.sortSuccess'),
        type: 'success'
      })

      // 直接重新获取数据无法刷新table， 要先清空table数据
      tableData.value = []
      // 重新获取数据
      cb && cb()
    }
  })
}
