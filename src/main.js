import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';  // eslint-disable-line no-unused-vars
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"
import store from "./store";
import './mock'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
