import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugin/element-ui'
import { Message } from 'element-ui';

Vue.config.productionTip = false
Vue.prototype.$message = Message;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
