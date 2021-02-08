import axios from '../../axios/goods'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            allGoods: [],
            allCategories: []
        }
    },
    mutations: {
        addGoods(state, payload) {
            state.allGoods = payload
        },
        addCategories(state, payload) {
            state.allCategories = payload
        }
    },
    actions: {
        async loadStock({commit}) {
            const {data} = await axios.get(`/products`)
            commit('addGoods', data)
        },
        async loadCategories({commit}) {
            const {data} = await axios.get('/categories')
            commit('addCategories', data)
        }
    },
    getters: {
        goods(state) {
            let unStocked = state.allGoods.filter((item)=> item.count === 0)
            let products = state.allGoods.filter((item)=> item.count !==0)
            products.push(...unStocked)

            return products
        },
        categories(state) {
            return state.allCategories
        }
    }

}