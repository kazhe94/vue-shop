<template>
  <div class="card">
    <products-filter
        :categories="categories"
        v-model:value="filter"
    ></products-filter>
    <div class="products-table">
      <product-item
          v-for="item in products"
          :key="item.id"
          :product="item"
      ></product-item>
    </div>
  </div>
</template>

<script>
import AppLoader from "@/components/ui/AppLoader";
import AppPage from "@/components/ui/AppPage";
import ProductItem from "@/components/ProductItem";
import ProductsFilter from "@/components/ProductsFilter";
import {onMounted, computed, ref, watch} from 'vue'
import {useStore} from "vuex";

export default {
  name: 'Home',
  components: {
    AppLoader,
    AppPage,
    ProductItem,
    ProductsFilter
  },
  setup() {
    const store = useStore()
    const filter = ref({})
    onMounted(()=> {
        store.dispatch('goods/loadStock')
        store.dispatch('goods/loadCategories')
    })
    const products = computed(()=> {
      return store.getters['goods/goods'].filter((item)=> {
         if(filter.value.title) {
           return item.title.toLowerCase().includes(filter.value.title.toLowerCase())
         }
         return item
      })
      .filter((item)=> {
        if(filter.value.category) {
          return item.category === filter.value.category
        }
        return item
      })
    })
    const categories = computed(()=> store.getters['goods/categories'])
    const cart = computed(()=> store.getters['cart/goods'])

    return {
      products,
      categories,
      filter,
    }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>