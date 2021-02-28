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
      <orders-row
          v-for="(order, idx) in orders"
          :order="order"
          :idx="idx"
          :key="order.id"
          :id="order.id"
      ></orders-row>
    </tbody>
  </table>
</template>

<script>
import OrdersRow from "@/components/admin/OrdersRow";

export default {
  name: "OrdersTable",
  components: {
    OrdersRow
  },
  props: ['orders'],
}
</script>

<style scoped>

</style>