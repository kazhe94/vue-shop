<template>
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
</template>

<script>
import {computed, ref} from "vue";
import {onBeforeRouteLeave} from "vue-router";

export default {
  name: "ProductForm",
  props: ['product', 'categories'],
  emits: ['confirm'],
  setup(props, {emit}) {
    const pData = ref()
    pData.value = {...props.product}
    console.log(pData.value.title)
    console.log(props.product)
    const isUpdated = computed(()=> {
      return props.product.title !== pData.value.title ||
          props.product.img !== pData.value.img ||
          props.product.price !== pData.value.price ||
          props.product.count !== pData.value.count ||
          props.product.category !== pData.value.category
    })
    console.log(isUpdated.value)
    onBeforeRouteLeave(()=> {
      if(isUpdated.value) {
        emit('confirm', true)
        return false
      }
      return true
    })

    return {
      pData
    }
  }
}
</script>

<style scoped>

</style>