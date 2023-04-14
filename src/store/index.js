import { createStore } from 'vuex'
import { inject } from 'vue'
export default createStore({
    state: {
        app: null,
        routes: [],
        currentUser: JSON.parse(window.sessionStorage.getItem('user'))
    },
    mutations: {
        setApp(state, app) {
            state.app = app
        },
        initRoutes(state, data) {
            state.routes = data
        },
        initCurrentUser(state, user) {
            state.currentUser = user
        }
    },
    actions: {
        // 在store初始化时获取app实例
        initApp({ commit }) {
            const app = inject('app')
            commit('setApp', app)
        }
    }
})
