import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import Home from '@/views/Home.vue'
import About from "@/views/About.vue";
import {createApp} from "vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/About',
        name: 'About',
        component: About
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    // 在全局前置守卫中存储组件级别的信息
    const currentUser = store.state.currentUser
    const routes = store.state.routes
    const app = createApp({})
    app.config.globalProperties.$currentUser = currentUser
    app.config.globalProperties.$routes = routes
    next()
})

export default router
