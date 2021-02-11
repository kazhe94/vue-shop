<template>
  <app-loader v-if="!product"></app-loader>
  <app-page v-else :title="product.title">
    <img :src="product.img" alt="text">
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="pData.title">
    </div>
    <div class="form-control">
      <label for="imglink">Изображение</label>
      <input type="text" id="imglink" v-model="pData.img">
    </div>
    <div class="form-control">
      <label for="price">Цена(руб)</label>
      <input type="number" id="price" v-model="pData.price">
    </div>
    <div class="form-control">
      <label for="count">Количество на складе</label>
      <input type="number" id="count" v-model="pData.count">
    </div>
    <div class="form-control">
      <label for="category">Категория</label>
      <select id="category" v-model="pData.category">
        <option
            v-for="c in categories"
            :value="c.type">{{c.title}}</option>
      </select>
    </div>
    <teleport to="body">
      <app-confirm
          v-if="leave"
          title="Были произведены изменения. Вы точно хотите покинуть страницу?"
          @reject="confirm = false"
          @confirm="confirm = true"
      >
      </app-confirm>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import {computed, onMounted, ref} from "vue";
import {useRoute, onBeforeRouteLeave} from "vue-router";
import AppConfirm from "@/components/ui/AppConfirm";

export default {
  name: "Product",
  components: {
    AppPage,
    AppLoader,
    AppConfirm,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const leave = ref(false)
    const pData = ref()
    const confirm = ref(false)

    onMounted(async ()=> {
      await store.dispatch('goods/loadOne', route.params.id)
      await store.dispatch('goods/loadCategories')
    })

    const categories = computed(()=> store.getters['goods/categories'])
    const product = computed(()=> store.getters['goods/oneProduct'])

    pData.value = {...product.value}
    const isUpdated = computed(()=> {
      if(product.value) {
        return product.value.title !== pData.value.title ||
            product.value.img !== pData.value.img ||
            product.value.price !== pData.value.price ||
            product.value.count !== pData.value.count ||
            product.value.category !== pData.value.category
      }
    })
    console.log(isUpdated.value)
    // onBeforeRouteLeave((to)=> {
    //   if(confirm.value) {
    //     return true
    //   }
    //   if(isUpdated.value) {
    //     leave.value = true
    //    return false
    //   }
    //   return true
    // })
    return {
      product,
      categories,
      leave,
      pData,
      confirm
    }
  }
}
</script>

<style scoped>

</style>