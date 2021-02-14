<template>
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
      <button class="btn" @click="toPay">Оплатить</button>
    </p>
  </div>

  <app-modal
      v-if="needAuth"
      title="Необходимо войти в систему или зарегистрироваться для оплаты заказа"
      @close="needAuth = false"
  >
    <app-form v-if="login"></app-form>
    <signup-form v-else></signup-form>
  </app-modal>
</template>

<script>
import {useStore} from "vuex";
import {computed, ref, onMounted} from 'vue'
import CartTable from "@/components/cart/CartTable";
import AppModal from "@/components/ui/AppModal";
import AppForm from "@/components/ui/AppForm";
import SignupForm from "@/components/ui/SignupForm";

export default {
  components: {
    CartTable,
    AppModal,
    AppForm,
    SignupForm
  },
  setup() {
    const store = useStore()
    const needAuth = ref()
    const login = ref(true)

    const toPay = ()=> {
      if(!needAuth) {
        console.log('Оплата произведена')
      }
      needAuth.value = true
    }

    const cart = computed(()=> {
      return store.getters['cart/goods']
    })
    const total = computed(()=> store.getters['cart/total'])
    return {
      cart,
      total,
      needAuth,
      toPay,
      login
    }
  }
}
</script>

<style scoped>

</style>