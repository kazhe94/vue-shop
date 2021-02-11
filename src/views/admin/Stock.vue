<template>
  <app-loader v-if="!products.length"></app-loader>
  <app-page v-else title="Инвентарь">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <stock-table
        :categories="categories"
        :products="products"
    ></stock-table>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import StockTable from "@/components/admin/StockTable";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";

export default {
  name: "Stock",
  components: {
    AppPage,
    StockTable,
    AppLoader
  },
  setup() {
    const store = useStore()
    const loading = ref(true)
    onMounted(()=> {
      store.dispatch('goods/loadStock')
      store.dispatch('goods/loadCategories')
      loading.value = false
    })

    const products = computed(()=> {
      return store.getters['goods/goods']
    })

    const categories = computed(()=> store.getters['goods/categories'])

    return {
      products,
      categories,
      loading
    }
  }

}
</script>

<style scoped>

</style>