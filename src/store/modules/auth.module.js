import {transformData} from "@/utils/transform";

const TOKEN_KEY = 'jwt-token'
import axios from "axios";
import baseAxios from '../../axios/goods'
import {error} from "../../../../vue_final/src/utils/error";
import router from '../../router/index'

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
            user: JSON.parse(localStorage.getItem('user')) || {},
            userList: []
        }
    },
    mutations: {
      setToken(state, token) {
          state.token = token
          localStorage.setItem(TOKEN_KEY, token)
      },
      logout(state) {
          state.token = null
          state.user = null
          localStorage.removeItem(TOKEN_KEY)
          localStorage.removeItem('user')
      },
      setUser(state, user) {
        state.user = user
          localStorage.setItem('user', JSON.stringify(user))
      },
      setUsers(state, users) {
          state.userList = users
      }
    },
    actions: {
      async login({commit, dispatch}, payload) {
          try {
              const {data} = await axios.post(
                  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`,
                  {...payload, returnSecureToken: true})
              commit('setToken', data.idToken)
              dispatch('getUser', data.localId)
              commit('clearMessage', null, {root: true})
          } catch (e) {
              dispatch('setMessage', {
                  value: error(e.response.data.error.message),
                  type: 'danger'
              }, {root: true})
              throw new Error()
          }
      },
        async getUser({commit}, id) {
          const {data} = await baseAxios.get(`/users/${id}.json`)
            commit('setUser', {
                ...data,
                id
            })
            if(data.role === 'admin') {
                router.push('/admin')
            }
            if(data.role === 'user') {
                router.push('/')
            }
        },
        async signUp({commit, dispatch}, payload) {
            const {data} = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`,
                {
                    ...payload,
                    returnSecureToken: true}
            )
            commit('setToken', data.idToken)
            dispatch('createUser', {
                id: data.localId,
                name: payload.name
            })
            commit('setUser', {
                id: data.localId,
                name: payload.name,
                role: 'user'
            })

        },
        async createUser({commit}, payload) {
            const {data} = await baseAxios.put(`/users/${payload.id}.json`, {
                role: 'user',
                email: payload.email,
                name: payload.name
            })
        },
        async loadUsers({commit}) {
          const {data} = await baseAxios.get(`/users.json`)
          commit('setUsers', transformData(data))
        },
        loadUser: async (_, id)=> {
          const {data} = await baseAxios.get(`/users/${id}.json`)
            return {
              ...data,
                id
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        },
        user(state) {
            return state.user
        },
        isAdmin(_, getters) {
            return getters.user.role === 'admin'
        },
        users(state) {
          return state.userList
        },
        orderUser: (_, getters) => (id) => {
            return getters.users.find(item => item.id === id)
        }
    }
}