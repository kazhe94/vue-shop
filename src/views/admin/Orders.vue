<template>
  <app-page title="Заказы">
    <app-loader v-if="loading"></app-loader>
    <orders-table
        v-else
        :orders="orders"
    ></orders-table>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import OrdersTable from "@/components/admin/OrdersTable";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";

export default {
  name: "Orders",
  components: {
    AppPage,
    OrdersTable,
    AppLoader
  },
  setup() {
    const store = useStore()
    const orders = ref()
    const loading = ref(true)
    onMounted(async ()=> {
      orders.value = await store.dispatch('goods/loadOrders')
      await store.dispatch('auth/loadUsers')
      loading.value = false
    })

    return {
      orders,
      loading,
    }
  }
}
</script>

<style scoped>

</style>