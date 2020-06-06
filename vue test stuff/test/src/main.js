import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false
const router = new Vue.Router({

})
Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
