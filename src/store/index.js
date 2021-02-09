import { createStore } from 'vuex'
import cart from './modules/cart.module'
import goods from './modules/goods.module'
import auth from './modules/auth.module'

export default createStore({
  state() {
    return {
      message: null
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(()=> {
        commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    cart,
    goods,
    auth
  }
})
