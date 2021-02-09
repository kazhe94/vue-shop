<template>
  <app-page back center :title="product.title">
    <img :src="product.img" />
    <p>Категория: <strong>{{ category.title }}</strong></p>
    <h3
        class="text-center text-white"
        v-if="product.count === 0"
    >
      Товар не найден.
    </h3>
    <div
        class="product-controls in-card"
        v-else-if="inCart"
    >
      <button
          class="btn danger"
          @click="removeOne"
      >-</button>
      <strong>{{ inCart.quantity }}</strong>
      <button
          class="btn primary"
          @click="addOne"
          :disabled="inCart.count === inCart.quantity"
      >+</button>
    </div>
    <button
        class="btn"
        v-else
        @click="addToCart"
    >
      {{ product.price }}
    </button>
  </app-page>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed} from "vue";
export default {
  components: {AppPage},
  setup() {
    const route = useRoute()
    const store = useStore()

    const product = computed(()=> store.getters['goods/product'](route.params.id))
    const inCart = computed(()=> store.getters['cart/current'](route.params.id))

    const addOne = ()=> {
      store.commit('cart/addOne', route.params.id)
    }
    const removeOne = ()=> {
      store.commit('cart/removeOne', route.params.id)
    }
    const addToCart = ()=> {
      store.commit('cart/addGoods', {
        ...product.value,
        quantity: 1
      })
    }
    const category = computed(()=> store.getters['goods/oneCategory'](product.value.category))

    return {
      product,
      inCart,
      addToCart,
      removeOne,
      addOne,
      category
    }
  }
}
</script>

<style scoped>

</style>