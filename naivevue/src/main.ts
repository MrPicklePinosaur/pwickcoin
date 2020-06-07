import Vue from "vue";
import ElementUI from 'element-ui'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI);
Vue.use(VueSocketIOExt,io('http://localhost:5000'));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
