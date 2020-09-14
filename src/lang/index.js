import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const getLanguage = () => {
  const lang = sessionStorage.getItem('lang') || localStorage.getItem('lang')
  if (lang) {
    if (lang === 'zh_CN') {
      return 'zh'
    } else {
      return 'en'
    }
  } else {
    const browserLang = navigator.language || navigator.userLanguage
    if (browserLang === 'zh-CN') {
      return 'zh'
    } else {
      return 'en'
    }
  }
  // return 'en'
}
const i18n = new VueI18n({
  locale: getLanguage(),
  messages
})

export default i18n
