import { createStore } from 'vuex'

export default createStore({
    state: {
        routes: [],
        currentUser: JSON.parse(window.sessionStorage.getItem('user'))
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data
        },
        initCurrentUser(state, user) {
            state.currentUser = user
        }
    }
})
