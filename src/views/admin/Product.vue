<template>
  <app-loader v-if="!product"></app-loader>
  <app-page v-else :title="product.title">
    <product-form
        :product="product"
        :categories="categories"
    ></product-form>
    <teleport to="body">
      <app-confirm
          v-if="confirm"
          title="Были произведены изменения. Вы точно хотите покинуть страницу?"></app-confirm>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import ProductForm from "@/components/admin/ProductForm";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, onBeforeRouteLeave} from "vue-router";
import AppConfirm from "@/components/ui/AppConfirm";

export default {
  name: "Product",
  components: {
    AppPage,
    AppLoader,
    AppConfirm,
    ProductForm
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const confirm = ref(false)

    onMounted(async ()=> {
      await store.dispatch('goods/loadOne', route.params.id)
      await store.dispatch('goods/loadCategories')
    })

    const categories = computed(()=> store.getters['goods/categories'])
    const product = computed(()=> store.getters['goods/oneProduct'])

    return {
      product,
      categories,
      confirm
    }
  }
}
</script>

<style scoped>

</style>