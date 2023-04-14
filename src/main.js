import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


const app = createApp(App)
// 将app对象提供给Vue
app.provide('app', app)

app.config.globalProperties.$currentUser = store.state.currentUser
app.config.globalProperties.$routes = store.state.routes
app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
