import axios from '../../axios/goods'
import store from '../index'
import {transformData} from '../../utils/transform'

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
        },
        updateCount(state, payload) {
            const product = state.allGoods.find(item => item.id === payload.id)
            product.count = payload.count
        },

    },
    actions: {
        async loadStock({commit}) {
            try {
                const {data} = await axios.get(`/products.json`)
                commit('addGoods', transformData(data))
            } catch (e) {

            }
        },
        async loadCategories({commit}) {
            try {
                const {data} = await axios.get('/categories.json')
                commit('addCategories', transformData(data))
            } catch (e) {}
        },
        loadOne: async (_, id)=> {
            try {
                const {data} = await axios.get(`/products/${id}.json`)
                return {
                    ...data,
                    id
                }
            } catch (e) {}
        },
        async removeCategory({commit}, id) {
            await axios.delete(`/categories/${id}.json`)
            commit('removeCategory', id)
        },
        async createCategory({commit}, payload) {
            const {data} = await axios.post(`/categories.json`, payload)
            commit('addCategory', {
                ...payload,
                id: data.id
            })
        },
        async createProduct({commit}, payload) {
            const {data} = await axios.post(`/products.json`, payload)
            commit('addProduct', {
                ...payload,
                id: data.id
            })
        },
        async removeProduct({commit}, id) {
            await axios.delete(`/products/${id}.json`)
            commit('removeProduct', id)
        },
        updateProduct: async ({commit}, payload)=> {
            const {data} = await axios.put(`/products/${payload.id}.json`, payload)
            return data
        },
        async changeCount({commit}, payload) {
            await axios.patch(`/products/${payload.id}.json`, {count: payload.count})
        },
        loadOrders: async ()=> {
            const {data} = await axios.get(`/orders.json`)
            return transformData(data)
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