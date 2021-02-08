<template>
  <div class="product-card">
    <div class="product-img">
      <img :src="product.img">
    </div>
    <h4 class="product-title">{{ product.title }}</h4>
    <div class="text-center">
      <p v-if="product.count === 0">Нет в наличии</p>
      <div v-else-if="cartItem" class="product-controls">
        <button
            class="btn danger"
            @click="removeOne"
        >-</button>
        <strong>{{ cartItem.quantity }}</strong>
        <button
            class="btn primary"
            @click="addOne"
            :disabled="cartItem.count === cartItem.quantity"
        >+</button>
      </div>
      <button
          class="btn"
          v-else
          @click="addToCart"
      >{{ product.price }}</button>
    </div>
  </div>
</template>

<script>
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";

export default {
  name: "ProductItem",
  props: ['product', 'cartItem'],
  setup(props) {
    const store = useStore()
    const isInCart = ref(false)
    const addOne = ()=> {
      store.commit('cart/addOne', props.product.id)
    }
    const removeOne = ()=> {
      store.commit('cart/removeOne', props.product.id)
    }
    const addToCart = ()=> {
      store.commit('cart/addGoods', {
        ...props.product,
        quantity: 1
      })
    }
    const cartItem = computed(()=> store.getters['cart/current'](props.product.id))

    return {
      addToCart,
      addOne,
      removeOne,
      cartItem
    }
  }
}
</script>

<style scoped>

</style>