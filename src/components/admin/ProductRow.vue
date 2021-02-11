<template>
  <tr>
    <td>{{ idx + 1}}</td>
    <td>{{ product.title }}</td>
    <td height="70"><img
        class="table-img"
        :src="product.img" alt=""
    ></td>
    <td>{{ product.count }}</td>
    <td>{{ category.title }}</td>
    <td>{{ currency(product.price) }}</td>
    <td>

        <button class="btn" @click="$router.push('/admin/product/'+ product.id)">Открыть</button>

    </td>
  </tr>
</template>

<script>
import {currency} from "@/utils/currency";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "ProductRow",
  props: ['product', 'idx', 'categories'],
  setup(props) {
    const store = useStore()
    const category = computed(()=> store.getters['goods/oneCategory'](props.product.category))
    return {
      currency,
      category
    }
  }
}
</script>

<style scoped>

</style>