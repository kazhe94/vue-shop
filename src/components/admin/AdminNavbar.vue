<template>
  <nav class="navbar">
    <h3>Админка</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/admin">Инвентарь</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категории</router-link>
      </li>
      <li>
        <a href="#" @click="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>

import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "AdminNavbar",
  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/auth')
      }
    }
  }
}
</script>

<style scoped>

</style>