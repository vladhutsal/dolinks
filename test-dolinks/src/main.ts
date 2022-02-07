import Vue from 'vue'
import App from './App.vue'
// import dolinks from 'dolinks'
import dolinks from '/Users/vladhutsal/ach/dolinks/src/install'

Vue.config.productionTip = false
Vue.use(dolinks);

new Vue({
  render: h => h(App),
}).$mount('#app')
