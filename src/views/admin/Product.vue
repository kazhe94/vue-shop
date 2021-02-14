<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else :title="product.title">
    <img :src="product.img" alt="text">
    <form @submit.prevent="update">
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
    </form>

    <button class="btn danger" @click="confirm = true">Удалить</button>
    <button class="btn" v-if="isUpdated" @click="update">Обновить</button>
  </app-page>
  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Вы уверены что хотите удалить товар?"
        @reject="confirm = false"
        @confirm="removeProduct"
    >
    </app-confirm>
  </teleport>

  <teleport to="body">
    <app-confirm
        v-if="leave"
        title="Были произведены изменения. Вы точно хотите покинуть страницу?"
        @reject="leave = false"
        @confirm="navigate"
    >
    </app-confirm>
  </teleport>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import {computed, onMounted, ref} from "vue";
import {useRoute, onBeforeRouteLeave, useRouter} from "vue-router";
import AppConfirm from "@/components/ui/AppConfirm";
import {useLeaveGuard} from "@/use/leave-guard";

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
    const router = useRouter()
    const loading = ref(true)
    const pData = ref({})
    const confirm = ref(false)
    const product = ref()
    onMounted(async ()=> {
     product.value = await store.dispatch('goods/loadOne', route.params.id)
      await store.dispatch('goods/loadCategories')
      pData.value = {...product.value}
      loading.value = false
    })

    const categories = computed(()=> store.getters['goods/categories'])

    const isUpdated = computed(()=> {
      if(product) {
        return product.value.title !== pData.value.title ||
            product.value.img !== pData.value.img ||
            product.value.price !== pData.value.price ||
            product.value.count !== pData.value.count ||
            product.value.category !== pData.value.category
      }
    })

    const removeProduct = ()=> {
      store.dispatch('goods/removeProduct', route.params.id)
      confirm.value = false
      router.push({name: 'Admin'})
    }
    const update = async ()=> {
      product.value = await store.dispatch('goods/updateProduct', pData.value)
    }


    return {
      product,
      categories,
      pData,
      confirm,
      loading,
      removeProduct,
      isUpdated,
      update,
      ...useLeaveGuard(isUpdated)
    }
  }
}
</script>

<style scoped>

</style>