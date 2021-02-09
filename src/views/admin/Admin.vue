<template>
  <div className="card">
    <stock-table :products="products"></stock-table>
  </div>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import StockTable from "@/components/admin/StockTable";

export default {
  name: "Stock",
  components: {
    AppPage,
    StockTable
  },
  setup() {
    const store = useStore()

    onMounted( ()=> {
      store.dispatch('goods/loadStock')
      store.dispatch('goods/loadCategories')
    })

    const products = computed(()=> {
      return store.getters['goods/goods']
    })

    console.log(products.value)
    return {
      products
    }
  }
}
</script>

<style scoped>

</style>