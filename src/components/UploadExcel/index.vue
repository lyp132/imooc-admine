<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragenter"
    >
      <el-icon><UploadFilled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import * as XLSX from 'xlsx/xlsx.mjs'
import { getHeaderRow, isExcel } from './utils'

const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})

// 点击上传触发
const loading = ref(false)
const excelUploadInput = ref(null)

// 点击长传按钮
const handleUpload = () => {
  // 触发input点击事件
  excelUploadInput.value.click()
}
// input点击事件
const handleChange = (e) => {
  // 获取到用户选中的文件
  const files = e.target.files
  // 获取第一个文件信息
  const rawFile = files[0]
  // 如果文件不存在，则返回
  if (!rawFile) return
  // 否则，触发上传事件
  upload(rawFile)
}
/**
 * 拖拽文本释放时触发
 * @param {*} e
 */
const handleDrop = (e) => {
  // 如果在上传中则跳过
  if (loading.value) {
    return
  }
  // console.log('拖拽文本释放时触发', e)
  const files = e.dataTransfer.files
  // 如果没有文件则抛出错误
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  // 判断是否为 .xlsx 或 .xls 或 .csv 文件格式
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是.xlsx 或 .xls 或 .csv 格式')
    return
  }
  // 触发上传事件
  upload(rawFile)
}
/**
 * 拖拽悬停时触发
 * @param {*} e
 */
const handleDragover = (e) => {
  // console.log('拖拽悬停时触发', e)
  // 在新位置生成原项的副本
  e.dataTransfer.dropEffect = 'copy'
}

/**
 * 触发上传事件
 * @param {*} rawFile {} excel文件信息
 */
const upload = (rawFile) => {
  // 将之前的input里面的内容置空
  excelUploadInput.value.value = null
  // 如果没有指定上传之前的回调的话，直接执行读取数据方法
  if (!props.beforeUpload) {
    readData(rawFile)
    return
  }
  // 如果指定了上传之前的回调，只有返回 true 之后才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readData(rawFile)
  }
}
/**
 * 读取数据（异步操作)
 * @param {*} rawFile {} excel文件信息
 */
const readData = (rawFile) => {
  // 按钮展示为加载中
  loading.value = true
  // 异步操作
  return new Promise((resolve, reject) => {
    // FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
    // 创建一个新构造的FileReader
    const reader = new FileReader()
    // 处理load事件。该事件在读取操作完成时触发
    reader.onload = (e) => {
      // console.log(e)
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格（工作簿）的名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1 (第一张表格)的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据头
      const header = getHeaderRow(worksheet)
      // console.log('解析数据头', header)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet)
      // console.log('解析数据体', results)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      loading.value = false
      resolve()
    }
    // 开始读取指定的文件中的内容，一旦完成，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象。
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 根据导入的内容生成数据
 * @param {*} excelData {} 解析之后的数据(数据头、数据体)
 */
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 0.01rem dashed #bbb;
    width: 3.5rem;
    height: 1.6rem;
    text-align: center;
    line-height: 1.6rem;
  }
  .drop {
    line-height: 0.6rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #bbb;
    :deep(.el-icon) {
      font-size: 0.6rem;
      display: block;
      margin: 0 auto 0;
    }
  }
}
</style>
