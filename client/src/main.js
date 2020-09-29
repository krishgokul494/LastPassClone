// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store/store'

Vue.config.productionTip = false
Vue.prototype.$overlay = false
Vue.prototype.$screen = Vue.observable({
  width: window.innerWidth,
  height: window.innerHeight
})

window.addEventListener('resize', () => {
  Vue.prototype.$screen.width = window.innerWidth
  Vue.prototype.$screen.height = window.innerHeight
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  vuetify,
  template: '<App/>'
})
