import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import Home from '@/views/Home.vue'
import About from "@/views/About.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import History from "@/views/History.vue";
import User_space from "@/views/User_space.vue";
import {createApp} from "vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/History',
        name: 'History',
        component: History,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/User_space',
        name: 'User_space',
        component: User_space,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/About',
        name: 'About',
        component: About
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
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
    if (to.meta.requireAuth && !currentUser) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router
