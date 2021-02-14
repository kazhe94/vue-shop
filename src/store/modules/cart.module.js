import axios from '../../axios/goods'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            goods: JSON.parse(localStorage.getItem('goods'))  || []
        }
    },
    mutations: {
        addGoods(state, payload) {
            state.goods.push(payload)
            localStorage.setItem('goods', JSON.stringify(state.goods))
        },
        addOne(state, id) {
            const currentProduct = state.goods.find((item)=> item.id === id)

            if(currentProduct.quantity !== currentProduct.count) {
                currentProduct.quantity++
                localStorage.setItem('goods', JSON.stringify(state.goods))
            }
        },
        removeOne(state, id) {
            const currentProduct = state.goods.find((item)=> item.id === id)
            currentProduct.quantity--
            localStorage.setItem('goods', JSON.stringify(state.goods))
            if(currentProduct.quantity === 0) {
                state.goods = state.goods.filter((item)=> item.quantity > 0)
                localStorage.setItem('goods', JSON.stringify(state.goods))
            }
        }
    },
    actions: {
        // setItem({commit},payload) {
        //     commit('setItem', payload)
        // }
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