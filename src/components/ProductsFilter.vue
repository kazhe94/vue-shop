<template>
  <div class="products-filter">
    <div class="form-control">
      <input
          type="text"
          placeholder="Найти товар..."
          v-model="title"
      >
      <span
          v-if="isActive"
          class="form-control-clear"
          @click="clearFilter">&times;</span>
    </div>

    <ul class="list">
      <li class="list-item" @click="category = null">Все</li>
      <li class="list-item"
          v-for="item in categories"
          @click="category = item.type"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "ProductsFilter",
  emits: ['update:value'],
  props: ['categories', 'value'],
  setup(_, {emit}) {
    const title = ref()
    const category = ref()
    const router = useRouter()

    watch([title,category], values => {
      emit('update:value', {
        title: values[0],
        category: values[1]
      })
      router.push({
        query: {
          title: values[0],
          category: values[1]
        }
      })
    })

    return {
      title, category,
      isActive: computed(()=> title.value || category.value),
      clearFilter: ()=> {
        title.value = ''
        category.value = null
      }

    }
  }
}
</script>

<style scoped>

</style>