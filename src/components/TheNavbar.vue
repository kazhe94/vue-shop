<template>
  <nav class="navbar">
    <h3>Online Shop</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/admin" v-if="user.role === 'admin'">В админку</router-link>
      </li>
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
        <span v-if="count" class="badge danger">{{count}}</span>
      </li>
      <li class="dropdown"
          @mouseover="dropdown = true"
          @mouseleave="dropdown = false">
        <router-link to="/account">
          {{user.name ? user.name : 'Личный кабинет'}}
        </router-link>
        <div class="submenu"
             v-if="dropdown"
        >
          <a class="submenu-item" href="#" v-if="!user.name" @click="modal = true">Вход или Регистрация</a>
          <router-link class="submenu-item" to="/account/notifications" v-if="user.name">Уведомления</router-link>
          <router-link class="submenu-item" to="/account/orders" v-if="user.name">Заказы</router-link>
          <a class="submenu-item" href="#" v-if="user.name" @click="logout">Выход</a>
        </div>
      </li>
    </ul>
  </nav>
  <teleport to="body">
    <app-modal
        v-if="modal"
        title="Необходимо войти в систему или зарегистрироваться для оплаты заказа"
        @close="modal = false"
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
  </teleport>
</template>

<script>

import {computed, ref} from "vue";
import {useStore} from "vuex";
import AppModal from "@/components/ui/AppModal";
import SignupForm from "@/components/ui/SignupForm";
import AppForm from "@/components/ui/AppForm";
import {useRouter} from "vue-router";

export default {
  name: "TheNavbar",
  components: {
    AppModal,
    SignupForm,
    AppForm
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const modal = ref(false)
    const active = ref('login')
    const dropdown = ref(false)
    const count = computed(()=> store.getters['cart/productsTotal'])

    const user = computed(()=> store.getters['auth/user'])
    const form = computed(()=> {
      if(active.value === 'login') {
        return 'app-form'
      }
      return 'signup-form'
    })
    return {
      count,
      modal,
      user,
      dropdown,
      form,
      active,
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      }
    }
  }

}
</script>

<style scoped lang="scss">
  .dropdown {
    position: relative;
  }
  .submenu {
    position: absolute;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    top: 100%;
    display: flex;
    flex-direction: column;
    //transform: translateX(-50%);
    &-item {
      //display: inline-block;
    }
  }
</style>