import store from '@/store'
import { createI18n } from 'vue-i18n'
import enLocale from './lang/en'
import zhLocale from './lang/zh'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

function getlocale() {
  return store?.getters?.language
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getlocale(),
  messages,
  warnHtmlMessage: false
})

export default i18n
