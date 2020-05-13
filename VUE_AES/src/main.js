// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;

// 引入消息框组件
import message from '../src/components/message/message.js'
// 注册消息框组件
Vue.use(message);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
