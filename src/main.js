import { createApp } from 'vue'
import App from './App.vue'


// 引入全局filters和directive
// import filters from '@/filters/index'
// import '@/directive/index'

// 引入ui组件和icon
// import ElementUI from 'element-ui'

import router from '@/router'
// import store from '@/store'

// 引入i18n
// import i18n from './lang'

// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })

// filters(Vue)

createApp(App)
  .use(router)
  .mount('#app')
