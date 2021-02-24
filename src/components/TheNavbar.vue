<template>
  <nav class="navbar">
    <h3>Online Shop</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/admin" v-if="user.role === 'admin'">В админку</router-link>
      </li>
      <li>
        <a href="#" @click="modal = true">Регистрация</a>
      </li>
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
        <span v-if="count" class="badge danger">{{count}}</span>
      </li>
      <li v-if="user">
        {{user.name}}
      </li>
    </ul>
  </nav>
  <teleport to="body">
    <app-modal
        v-if="modal"
        title="Регистрация"
        @close="modal = false"
    >
      <signup-form @created="modal = false"></signup-form>
    </app-modal>
  </teleport>
</template>

<script>

import {computed, ref} from "vue";
import {useStore} from "vuex";
import AppModal from "@/components/ui/AppModal";
import SignupForm from "@/components/ui/SignupForm";

export default {
  name: "TheNavbar",
  components: {
    AppModal,
    SignupForm
  },
  setup() {
    const store = useStore()
    const modal = ref(false)
    const count = computed(()=> store.getters['cart/productsTotal'])

    const user = computed(()=> store.getters['auth/user'])

    return {
      count,
      modal,
      user
    }
  }

}
</script>

<style scoped>

</style>