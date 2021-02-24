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
        },
        clearCart(state) {
            state.goods = []
            localStorage.removeItem('goods')
        }
    },
    actions: {
        async createOrder({commit, dispatch, rootGetters}) {
            const user = store.getters['auth/user']
            const cart = rootGetters['cart/goods']
            const products = rootGetters['goods/goods']
            const order = {
                date: new Date(),
                userId: user.id,
                sum: store.getters['cart/total'],
                productList: []
            }

            cart.forEach((item)=> {
                const product = products.find((p)=> p.id === item.id)
                const toOrder = {
                    name: item.title,
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                }
                order.productList.push(toOrder)
                let count = product.count - item.quantity
                commit('goods/updateCount', {
                    id: item.id,
                    count: count
                }, {root: true})
                dispatch('goods/changeCount', {
                    id: item.id,
                    count: count
                }, {root: true})
            })
            await axios.post(`/orders.json`, order)
            commit('clearCart')
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
        },
        productsTotal(_, getters) {
            return getters.goods.reduce((num, c) => num + c.quantity, 0)
        }
    }
}