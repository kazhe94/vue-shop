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

  <teleport to="body">
    <app-modal
        v-if="modal"
        title="Заполните поля для нового товара"
        @close="modal = false"
    >
      <product-form @created="modal = false"></product-form>
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import StockTable from "@/components/admin/StockTable";
import AppModal from "@/components/ui/AppModal";
import ProductForm from "@/components/admin/ProductForm";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";

export default {
  name: "Stock",
  components: {
    AppPage,
    StockTable,
    AppLoader,
    AppModal,
    ProductForm
  },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const modal = ref(false)
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
      loading,
      modal
    }
  }

}
</script>

<style scoped>

</style>