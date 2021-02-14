<template>
  <app-page title="Категории">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Наименование</th>
        <th>Категория</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(c, idx) in categories">
        <td>{{idx + 1}}</td>
        <td>{{c.title}}</td>
        <td>{{c.type}}</td>
        <td>
          <button class="btn danger" @click="id = c.id, confirm = true">x</button>
        </td>
      </tr>
      </tbody>
    </table>
  </app-page>

  <teleport to="body">
    <app-modal
        v-if="modal"
        title="Заполните поля для новой категории"
        @close="modal = false"
    >
      <category-form @created="modal = false"></category-form>
    </app-modal>
  </teleport>

  <teleport to="body">
    <app-confirm
        v-if="confirm"
        title="Вы уверены что хотите удалить категорию?"
        @reject="confirm = false"
        @confirm="removeCategory"
    >
    </app-confirm>
  </teleport>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import AppConfirm from "@/components/ui/AppConfirm";
import AppModal from "@/components/ui/AppModal";
import CategoryForm from "@/components/admin/CategoryForm";
export default {
  name: "Categories",
  components: {
    AppPage,
    AppConfirm,
    AppModal,
    CategoryForm
  },
  setup() {
    const store = useStore()
    const confirm = ref(false)
    const modal = ref(false)
    const id = ref()

    onMounted(()=> {
      store.dispatch('goods/loadCategories')
    })
    const categories = computed(()=> {
      return store.getters['goods/categories']
    })
    const removeCategory = ()=> {
        store.dispatch('goods/removeCategory', id.value)
        confirm.value = false
    }
    return {
      categories,
      removeCategory,
      confirm,
      id,
      modal
    }
  }
}
</script>

<style scoped>

</style>