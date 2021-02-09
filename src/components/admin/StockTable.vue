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
    <tr v-for="(p, idx) in products" :key="r.id">
      <td>{{ idx + 1}}</td>
      <td>{{ p.title }}</td>
      <td>{{ p.img }}</td>
      <td>{{ p.count }}</td>
      <td>{{ p.category }}</td>
      <td>{{ p.price }}</td>
      <td>
        <router-link
            v-slot="{navigate}"
            custom :to="{name: 'Request', params: {id: r.id}}"
        >
          <button class="btn primary" @click="navigate">Открыть</button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "StockTable",
  props: ['products'],
  setup(props) {
    console.log(props.products)
  }
}
</script>

<style scoped>

</style>