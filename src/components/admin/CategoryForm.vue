<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Название категории</label>
      <input type="text" id="title" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{ titleError }}</small>
    </div>
    <div class="form-control" :class="{invalid: typeError}">
      <label for="type">Тип категории</label>
      <input type="text" id="type" v-model="type" @blur="typeBlur">
      <small v-if="typeError">{{ typeError }}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting">Создать заявку</button>
  </form>
</template>

<script>
import {useStore} from "vuex";
import {useCategoryForm} from "@/use/category-form";
export default {
  name: "CategoryForm",
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const submit = async (values)=> {
      await store.dispatch('goods/createCategory', values)
      emit('created')
    }
    return {
      ...useCategoryForm(submit)
    }
  }
}
</script>

<style scoped>

</style>