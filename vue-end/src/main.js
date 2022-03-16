import Vue from 'vue'
import App from './App.vue'

//如果是index文件，那么可以省略
import Router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from './axios/http.js';
import store from './store/index.js';

// import editor from '@blog1997/vue-umeditor'
// Vue.use(editor)

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router : Router,
  store,
  render: h => h(App),
}).$mount('#app')
