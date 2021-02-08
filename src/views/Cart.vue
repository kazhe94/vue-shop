<template>
<!--  <app-loader v-if="loading"></app-loader>-->
  <div class="card">
    <h1>Корзина</h1>

    <h3 class="text-center" v-if="cart.length === 0">В корзине пока ничего нет</h3>
    <cart-table
        v-else
        :products="cart"
    ></cart-table>
    <hr>
    <p class="text-right"><strong>Всего: {{ total }} руб.</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, ref, onMounted} from 'vue'
import CartTable from "@/components/cart/CartTable";
import AppLoader from "@/components/ui/AppLoader";

const CART_MODEL = {
  '2': 3,
  '5': 1,
  '17': 4
}

export default {
  components: {
    CartTable,
    AppLoader
  },
  setup() {
    const store = useStore()
    const loading = ref(true)

    // onMounted(() => {
    //   store.dispatch('cart/loadGoods', CART_MODEL)
    //   loading.value = false
    // })

    const cart = computed(()=> {
      return store.getters['cart/goods']
    })
    const total = computed(()=> store.getters['cart/total'])
    return {
      cart,
      total,
      loading
    }
  }
}
</script>

<style scoped>

</style>