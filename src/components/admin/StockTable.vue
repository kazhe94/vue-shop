<template>
  <table class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Наименование</th>
      <th>Изображение</th>
      <th>На складе</th>
      <th>Категория</th>
      <th>Цена</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
      <product-row
          v-if="categories.length"
          v-for="(p, idx) in products"
          :product="p"
          :key="p.id"
          :categories="categories"
          :idx="idx"
      >
      </product-row>
    </tbody>
  </table>
</template>

<script>
import ProductRow from "@/components/admin/ProductRow";
export default {
  name: "StockTable",
  props: ['products', 'categories'],
  components: {
    ProductRow
  },

}
</script>

<style scoped>

</style>