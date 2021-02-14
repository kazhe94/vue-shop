<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Название категории</label>
      <input type="text" id="title" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{ titleError }}</small>
    </div>
    <div class="form-control" :class="{invalid: categoryError}">
      <label for="category">Тип категории</label>
      <select id="category" v-model="category">
        <option :value="c.type" v-for="c in categories">{{c.title}}</option>
      </select>
      <small v-if="categoryError">{{ categoryError }}</small>
    </div>
    <div class="form-control" :class="{invalid: priceError}">
      <label for="price">Цена товара</label>
      <input type="number" id="price" v-model="price" @blur="priceBlur">
      <small v-if="priceError">{{ priceError }}</small>
    </div>
    <div class="form-control" :class="{invalid: countError}">
      <label for="count">Количество товара</label>
      <input type="number" id="count" v-model="count" @blur="countError">
      <small v-if="countError">{{ countError }}</small>
    </div>
    <div class="form-control" :class="{invalid: imgError}">
      <label for="img">Ссылка на изображение</label>
      <input type="text" id="img" v-model="img" @blur="imgBlur">
      <small v-if="imgError">{{ imgError }}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting">Добавить товар</button>
  </form>
</template>

<script>
import {useProductForm} from "@/use/product-form";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "ProductForm",
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()

    const categories = computed(()=> {
      return store.getters['goods/categories']
    })

    const submit = async (values)=> {
      await store.dispatch('goods/createProduct', values)
      emit('created')
    }

    return {
      ...useProductForm(submit),
      categories
    }
  }
}
</script>

<style scoped>

</style>