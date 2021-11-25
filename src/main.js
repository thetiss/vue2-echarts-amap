import Vue from 'vue'
import App from './App.vue'
import * as echarts from 'echarts' // echarts 5.0版本引入方式
import AMapLoader from '@amap/amap-jsapi-loader'
import 'echarts-extension-amap'

Vue.config.productionTip = false
// 全局引入echarts
Vue.prototype.$echarts = echarts
Vue.prototype.$AMapLoader = AMapLoader

new Vue({
  render: h => h(App),
}).$mount('#app')
