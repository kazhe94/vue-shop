<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back v-else :title="'Заказ для ' + user.name">
    <p>Дата заказа: {{new Date(order.date).toLocaleDateString()}}</p>
    <p>Время заказа: {{new Date(order.date).toLocaleTimeString()}}</p>
    <p>Сумма заказа: {{currency(order.sum)}}</p>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Наименование</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Ссылка на товар</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in order.productList" :key="item.productId">
          <td>{{idx + 1}}</td>
          <td>{{item.name}}</td>
          <td>{{currency(item.price)}}</td>
          <td>{{item.quantity}} шт.</td>
          <td>
            <button class="btn" @click="$router.push(`/product/${item.productId}`)">Перейти</button>
          </td>
        </tr>
      </tbody>
    </table>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import { onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {currency} from "@/utils/currency";
export default {
  name: "Order",
  components: {
    AppPage,
    AppLoader
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const loading = ref(true)
    const order = ref()
    const user = ref()
    onMounted(async ()=> {
      order.value = await store.dispatch('goods/loadOrder', route.params.id)
      user.value = await store.dispatch('auth/loadUser', order.value.userId)
      loading.value = false
    })

    return {
      loading,
      user,
      order,
      currency
    }
  }
}
</script>

<style scoped>

</style>