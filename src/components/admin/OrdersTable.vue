<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Заказчик</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, idx) in orders">
        <td>{{idx + 1}}</td>
        <td>{{order.userId}}</td>
        <td>{{currency(order.sum)}}</td>
        <td>
          {{new Date(order.date).toLocaleDateString()}}
          {{new Date(order.date).toLocaleTimeString()}}
        </td>
        <td>
          <button class="btn">Открыть</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

import {currency} from "@/utils/currency";
import {useStore} from "vuex";
import {onMounted} from "vue";
export default {
  name: "OrdersTable",
  props: ['orders'],
  setup() {
    const store = useStore()



    return {
      currency,
    }
  }
}
</script>

<style scoped>

</style>