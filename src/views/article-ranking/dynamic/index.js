import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
import DynamicData from './DynamicData'

// 1: 创建出动态的列数据  []
export const dynamicData = ref(DynamicData())
// 监听语言变化，重新获取国际化的值
watchSwitchLang(() => {
  // 缓存选中项
  const catchSelect = dynamicData.value.filter((item) => {
    return selectDynamicLabel.value.includes(item.label)
  })
  // console.log('缓存选中项', catchSelect)

  dynamicData.value = DynamicData()
  // 重新处理被勾选的列数据
  // initSelectDynamicLabel()
  changeSelectDynamicLabel(catchSelect)
})

// 2: 创建出被勾选的动态列数据
export const selectDynamicLabel = ref([])
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()
// 语言变化后勾选
const changeSelectDynamicLabel = (catchSelect) => {
  console.log('缓存选中项', catchSelect)
  const catchData = catchSelect.map((item) => item.prop)
  // 定义筛选后勾选的数据
  const catchselectDynamicLabel = []
  // 遍历数组：筛选出包含选中项的数据
  dynamicData.value.forEach((item) => {
    if (catchData.includes(item.prop)) {
      catchselectDynamicLabel.push(item.label)
    }
  })
  selectDynamicLabel.value = catchselectDynamicLabel
  console.log('勾选后数据', selectDynamicLabel.value)
}

// 3: 声明 table的列数据
export const tableColumns = ref([])
// 监听选中项的变化，根据选中项动态改变 table 列数据的值
watch(
  selectDynamicLabel,
  (val) => {
    console.log(val)
    tableColumns.value = []
    // 遍历选中项
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
