<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click.stop="OnClick"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import {} from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const OnClick = () => {
  const driverObj = driver({
    animate: false,
    showProgress: false,
    showButtons: ['next', 'previous', 'close'],
    doneBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    steps: [
      // {
      //   element: '#guide-start',
      //   popover: {
      //     title: 'aaa',
      //     description: 'bbb',
      //     side: 'bottom',
      //     align: 'start'
      //   }
      // },
      // {
      //   element: '#guide-hamburger',
      //   popover: {
      //     title: 'aaa',
      //     description: 'bbb',
      // side: 'bottom',
      // align: 'start'
      //   }
      // }
      {
        element: '#guide-start',
        popover: {
          title: i18n.t('msg.guide.guideTitle'),
          description: i18n.t('msg.guide.guideDesc'),
          side: 'bottom',
          align: 'center'
        }
      },
      {
        element: '#guide-hamburger',
        popover: {
          title: i18n.t('msg.guide.hamburgerTitle'),
          description: i18n.t('msg.guide.hamburgerDesc'),
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#guide-breadcrumb',
        popover: {
          title: i18n.t('msg.guide.breadcrumbTitle'),
          description: i18n.t('msg.guide.breadcrumbDesc'),
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#guide-search',
        popover: {
          title: i18n.t('msg.guide.searchTitle'),
          description: i18n.t('msg.guide.searchDesc'),
          side: 'bottom',
          align: 'end'
        }
      },
      {
        element: '#guide-full',
        popover: {
          title: i18n.t('msg.guide.fullTitle'),
          description: i18n.t('msg.guide.fullDesc'),
          side: 'bottom',
          align: 'end'
        }
      },
      {
        element: '#guide-theme',
        popover: {
          title: i18n.t('msg.guide.themeTitle'),
          description: i18n.t('msg.guide.themeDesc'),
          side: 'bottom',
          align: 'end'
        }
      },
      {
        element: '#guide-lang',
        popover: {
          title: i18n.t('msg.guide.langTitle'),
          description: i18n.t('msg.guide.langDesc'),
          side: 'bottom',
          align: 'end'
        }
      },
      {
        element: '#guide-tags',
        popover: {
          title: i18n.t('msg.guide.tagTitle'),
          description: i18n.t('msg.guide.tagDesc'),
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#guide-sidebar',
        popover: {
          title: i18n.t('msg.guide.sidebarTitle'),
          description: i18n.t('msg.guide.sidebarDesc'),
          side: 'right',
          align: 'center'
        }
      }
    ]
  })
  driverObj.drive()
}
</script>

<style lang="scss" scoped></style>
