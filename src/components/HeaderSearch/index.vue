<template>
  <div class="header-search" :class="{ show: isShow }">
    <!-- 搜索图标 -->
    <svg-icon
      id="guide-search"
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    ></svg-icon>
    <!-- 搜索下拉框 -->
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { watchSwitchLang } from '@/utils/i18n'
import { filterRouters } from '@/utils/route'
import Fuse from 'fuse.js'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { generateRoutes } from './FuseData'

// 控制search搜索框显示和隐藏
const isShow = ref(false)
// 选中项绑定值
const search = ref('')
// 获取select组件实例
const headerSearchSelectRef = ref(null)

// 点击展示或隐藏select框
const onShowClick = () => {
  // console.log('isShow', isShow.value)
  isShow.value = !isShow.value
}
// 关闭search 的处理事件
const onClose = () => {
  // 取消焦点
  headerSearchSelectRef.value.blur()
  searchOptions.value = []
  search.value = ''
  isShow.value = false
}
// 监听search 打开，处理close 事件
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

const router = useRouter()
// 搜索的数据源
const searchPool = computed(() => {
  const filterRouter = filterRouters(router.getRoutes())
  // 返回期望得到的检索数据源
  return generateRoutes(filterRouter)
})

// 对检索数据源进行模糊搜索
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

// 选中值发生变化时触发的事件
const onSelectChange = (val) => {
  // 设置输入框展示的值
  search.value = val.title.join(' > ')
  // 跳转路由
  router.push(val.path)
}

// 定义搜索结果
const searchOptions = ref([])
// 自定义远程搜索方法
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 处理搜索框国际化问题
watchSwitchLang(() => {
  // 搜索的数据源
  const searchPool = computed(() => {
    const filterRouter = filterRouters(router.getRoutes())
    // 返回期望得到的检索数据源
    return generateRoutes(filterRouter)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  :deep(.search-icon) {
    cursor: pointer;
    font-size: 0.18rem;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 0.18rem;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 2.1rem;
      margin-left: 0.1rem;
    }
  }
}
</style>
