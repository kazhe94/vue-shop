import axios from '../../axios/goods'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            allGoods: [],
            allCategories: [],
            oneProduct: null
        }
    },
    mutations: {
        addGoods(state, payload) {
            state.allGoods = payload
        },
        addOne(state, payload) {
          state.oneProduct = payload
        },
        addCategories(state, payload) {
            state.allCategories = payload
        }
    },
    actions: {
        async loadStock({commit}) {
            try {
                const {data} = await axios.get(`/products`)
                commit('addGoods', data)
            } catch (e) {

            }
        },
        async loadCategories({commit}) {
            try {
                const {data} = await axios.get('/categories')
                commit('addCategories', data)
            } catch (e) {}
        },
        async loadOne({commit}, id) {
            try {
                const {data} = await axios.get(`/products/${id}`)
                commit('addOne', data)
            } catch (e) {}
        },
    },
    getters: {
        goods(state) {
            let unStocked = state.allGoods.filter((item)=> item.count === 0)
            let products = state.allGoods.filter((item)=> item.count !==0)
            products.push(...unStocked)
            return products
        },
        product: (_, getters)=> (id)=> {
            return getters.goods.find((item)=> item.id === id)
        },
        oneProduct(state) {
            return state.oneProduct
        },
        categories(state) {
            return state.allCategories
        },
        oneCategory: (_, getters)=> (category)=> {
            return getters.categories.find(item => item.type === category)
        }

    }

}