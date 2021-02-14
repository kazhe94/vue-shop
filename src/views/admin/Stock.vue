<template>
  <app-loader v-if="!products.length"></app-loader>
  <app-page v-else title="Инвентарь">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <stock-table
        :categories="categories"
        :products="pageProducts"
    ></stock-table>
    <app-pagination
        :count="products.length"
        :size="PAGE_SIZE"
        v-model="page"
    ></app-pagination>
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
import AppPagination from "@/components/ui/AppPagination";
import {useStore} from "vuex";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import chunk from 'lodash.chunk'

export default {
  name: "Stock",
  components: {
    AppPage,
    StockTable,
    AppLoader,
    AppModal,
    ProductForm,
    AppPagination
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const loading = ref(true)
    const modal = ref(false)
    const page = ref(route.query.page ? +route.query.page : 1)

    onMounted(()=> {
      store.dispatch('goods/loadStock')
      store.dispatch('goods/loadCategories')
      loading.value = false
    })
    const PAGE_SIZE = 5
    const products = computed(()=> {
      return store.getters['goods/goods']
    })

    const _setPage = ()=> router.push({query: {page: page.value}})
    watch(page, _setPage)
    onMounted(()=> _setPage())

    const pageProducts = computed(()=> chunk(products.value, PAGE_SIZE)[page.value - 1])

    const categories = computed(()=> store.getters['goods/categories'])

    return {
      products,
      categories,
      loading,
      modal,
      PAGE_SIZE,
      page,
      pageProducts
    }
  }

}
</script>

<style scoped>

</style>