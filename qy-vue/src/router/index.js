import Vue from 'vue'
import VueRouter from 'vue-router'


const Main = () => import('../views/MainWindow.vue')

Vue.use(VueRouter)

const routes = [
    {
        path:'/main',
        name:'main',
        component: Main
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router