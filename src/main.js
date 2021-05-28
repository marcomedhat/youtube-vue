import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'

import VueRouter from 'vue-router'
import Routes from './routes'
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

Vue.config.productionTip = false

Vue.use(VueResource)

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
