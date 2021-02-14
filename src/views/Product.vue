<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else back center :title="product.title">
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
import AppLoader from "@/components/ui/AppLoader";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
export default {
  components: {
    AppPage,
    AppLoader
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const product = ref()
    const loading = ref(true)

    onMounted(async ()=> {
      product.value = await store.dispatch('goods/loadOne', route.params.id)
      await store.dispatch('goods/loadCategories')
      loading.value = false
    })

    // const product = computed(()=> store.getters['goods/product'](route.params.id))
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
      category,
      loading
    }
  }
}
</script>

<style scoped>

</style>