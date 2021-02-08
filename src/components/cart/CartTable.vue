<template>
  <table class="table">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена (шт)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in products" :key="item.id">
      <td>{{ item.title }}</td>
      <td>
        <button class="btn primary" @click="addOne(item.id)">+</button>
        {{ item.quantity }} шт.
        <button class="btn danger" @click="removeOne(item.id)">-</button>
      </td>
      <td>{{currency(item.price)}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>

import {currency} from "@/utils/currency";
import {useStore} from "vuex";

export default {
  name: "CartTable",
  props: ['products'],
  setup() {
    const store = useStore()

    const addOne = (id)=> {
      store.commit('cart/addOne', id)
    }
    const removeOne = (id)=> {
      store.commit('cart/removeOne', id)
    }

    return {
      currency,
      addOne,
      removeOne
    }
  }
}
</script>

<style scoped>

</style>