import Vue from 'vue'
import App from './App.vue'

//如果是index文件，那么可以省略
import Router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Vant from 'vant';
import 'vant/lib/index.css';

import axios from './axios/http.js';
import store from './store/index.js';
import './utils/rem'

import editor from '@blog1997/vue-umeditor'

import BaiduMap from 'vue-baidu-map'

Vue.use(editor)

Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'nOFNDzlz055NOk0AbUVWrGhBKrTGXnBY'
})

new Vue({
  router : Router,
  store,
  render: h => h(App),
}).$mount('#app')
