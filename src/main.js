import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from './api/axios'
import store from './store/index';
import ElementUI from 'element-ui';
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import './assets/css/public.css'

import '../theme/index.css';
import './assets/iconfont/iconfont.css';  //主题文件
// import 'element-ui/lib/theme-chalk/index.css';

import echarts from 'echarts'

import common from '@/plugins/common';
import VueLazyLoad from 'vue-lazyload'
import OSS from 'ali-oss'

Vue.prototype.$echarts = echarts


Vue.prototype.OSS = OSS;
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: 'https://xbw-vue.oss-cn-hangzhou.aliyuncs.com/static/images/load_err.jpg',//require('https://xbw-vue.oss-cn-hangzhou.aliyuncs.com/static/images/load_err.jpg'),
  loading: 'https://xbw-vue.oss-cn-hangzhou.aliyuncs.com/static/images/load.png',//require('https://xbw-vue.oss-cn-hangzhou.aliyuncs.com/static/images/load.png'),
  attempt: 2,
})

Vue.config.productionTip = false

Vue.use(ElementUI).use(vueQuillEditor);
Vue.use(common);  //

Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
