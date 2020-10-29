

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from "./router";
import "u-reset.css";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filter from "./filter";

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http=axios;

// Vue.filter('formateTime',function (value) {
//    注册全局过滤器
// })


Object.keys(filter).forEach(ele=>{
  Vue.filter(ele,filter[ele]);
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
