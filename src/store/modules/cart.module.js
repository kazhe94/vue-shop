import axios from '../../axios/goods'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            goods: []
        }
    },
    mutations: {
        addGoods(state, payload) {
            state.goods.push(payload)
        },
        addOne(state, id) {
            const currentProduct = state.goods.find((item)=> item.id === id)

            if(currentProduct.quantity !== currentProduct.count) {
                currentProduct.quantity++
            }
        },
        removeOne(state, id) {
            const currentProduct = state.goods.find((item)=> item.id === id)
            currentProduct.quantity--
            if(currentProduct.quantity === 0) {
                state.goods = state.goods.filter((item)=> item.quantity > 0)
            }
        }
    },
    actions: {
        // async loadGoods({commit}, payload) {
        //     const cartProds = Object.keys(payload).map((id)=> `id=${id}`).join('&')
        //     const {data} = await axios.get(`/products?${cartProds}`)
        //     const cartData = data.map((item)=> {
        //         return {
        //             ...item,
        //             quantity: payload[item.id]
        //         }
        //     })
        //     commit('addGoods', cartData)
        // },
        setItem({commit},payload) {
            commit('setItem', payload)
        }
    },
    getters: {
        goods(state) {
            return state.goods
        },
        total(state, getters) {
            const totalPrice = []
            getters.goods.forEach((item)=> totalPrice.push(item.price * item.quantity))
            return totalPrice.reduce((accumulator, currentVal)=> accumulator + currentVal, 0)
        },
        current: (_, getters) => (id) => {
            return getters.goods.find(item => item.id === id)
        }
    }
}