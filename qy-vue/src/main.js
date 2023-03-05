import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugin/element-ui'
import { Message } from 'element-ui';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
