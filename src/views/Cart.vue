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
    <component :is="form"></component>
    <button
        :class="['btn', {'primary': active === 'login'}]"
        @click="active = 'login'"
    >
      Вход в систему
    </button>
    <button
        :class="['btn', {'primary': active === 'signup'}]"
        @click="active = 'signup'"
    >
      Регистрация
    </button>
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
    const login = ref(true)
    const active = ref('login')
    const needAuth = ref(false)

    const isAuth = computed(()=> store.getters['auth/isAuthenticated'])
    const toPay = ()=> {
      if(!isAuth.value) {
        needAuth.value = true
      }
      if(isAuth.value) {
        store.dispatch('cart/createOrder')
        console.log('Оплата произведена')
      }
    }
    const form = computed(()=> {
      if(active.value === 'login') {
        return 'app-form'
      }
      return 'signup-form'
    })

    const cart = computed(()=> {
      return store.getters['cart/goods']
    })
    const total = computed(()=> store.getters['cart/total'])
    return {
      cart,
      total,
      needAuth,
      toPay,
      login,
      form,
      active
    }
  }
}
</script>

<style scoped>

</style>