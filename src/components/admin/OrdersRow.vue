<template>
  <tr>
    <td>{{idx + 1}}</td>
    <td>{{user.name}}</td>
    <td>{{currency(order.sum)}}</td>
    <td>
      {{new Date(order.date).toLocaleDateString()}}
      {{new Date(order.date).toLocaleTimeString()}}
    </td>
    <td>
      <button class="btn">Открыть</button>
    </td>
  </tr>
</template>

<script>
import {useStore} from "vuex";
import {currency} from "@/utils/currency";
import {computed} from "vue";
export default {
  name: "OrdersRow",
  props: ['order', 'idx'],
  setup(props) {
    const store = useStore()
    const user = computed(()=> store.getters['auth/orderUser'](props.order.userId))
    return {
      currency,
      user
    }
  }
}
</script>

<style scoped>

</style>