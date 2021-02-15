import axios from '../../axios/goods'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            allGoods: [],
            allCategories: [],
        }
    },
    mutations: {
        addGoods(state, payload) {
            state.allGoods = payload
        },
        addCategories(state, payload) {
            state.allCategories = payload
        },
        removeCategory(state, payload) {
            state.allCategories = state.allCategories.filter((item)=> {
                return item.id !== payload
            })
        },
        addCategory(state, payload) {
            state.allCategories.push(payload)
        },
        addProduct(state, payload) {
            state.allGoods.push(payload)
        },
        removeProduct(state, id) {
            state.allGoods = state.allGoods.filter(item => item.id !== id)
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
        loadOne: async (_, id)=> {
            try {
                const {data} = await axios.get(`/products/${id}`)
                return data
            } catch (e) {}
        },
        async removeCategory({commit}, id) {
            await axios.delete(`/categories/${id}`)
            commit('removeCategory', id)
        },
        async createCategory({commit}, payload) {
            const {data} = await axios.post(`/categories`, payload)
            console.log(data)
            commit('addCategory', {
                ...payload,
                id: data.id
            })
        },
        async createProduct({commit}, payload) {
            const {data} = await axios.post(`/products`, payload)
            commit('addProduct', {
                ...payload,
                id: data.id
            })
        },
        async removeProduct({commit}, id) {
            await axios.delete(`/products/${id}`)
            commit('removeProduct', id)
        },
        updateProduct: async ({commit}, payload)=> {
            const {data} = await axios.put(`/products/${payload.id}`, payload)
            return data
        }

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
        categories(state) {
            return state.allCategories
        },
        oneCategory: (_, getters)=> (category)=> {
            return getters.categories.find(item => item.type === category)
        }

    }

}