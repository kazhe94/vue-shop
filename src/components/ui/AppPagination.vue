<template>
  <ul class="pagination">
    <li class="pagination__item">
      <button
          @click="$emit('update:modelValue', 1)"
          :disabled="modelValue === 1"
      >
        &lt;&lt;
      </button>
    </li>
    <li class="pagination__item">
      <button
          @click="$emit('update:modelValue', modelValue - 1)"
          :disabled="modelValue === 1"
      >
        &lt;
      </button>
    </li>
    <li v-for="page in pages" class="pagination__item">
      <button
          :class="{'active': page === modelValue}"
          @click="$emit('update:modelValue', page)"
      >
        {{page}}
      </button>
    </li>
    <li class="pagination__item">
      <button
          @click="$emit('update:modelValue', modelValue + 1)"
          :disabled="modelValue === pages"
      >
        &gt;
      </button>
    </li>
    <li class="pagination__item">
      <button
          @click="$emit('update:modelValue', pages)"
          :disabled="modelValue === pages"
      >
        &gt;&gt;
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppPagination",
  emits: ['update:modelValue'],
  props:['count', 'size', 'modelValue'],
  setup(props) {
    const pages = Math.ceil(props.count / props.size)
    return {
      pages
    }
  }
}
</script>

<style scoped lang="scss">
  .pagination {
    display: flex;
    list-style: none;
    button {
      font-size: 18px;
      width: 35px;
      height: 35px;
      border: 1px solid #ccc;
      border-radius: 3px;
      cursor: pointer;
    }
    &__item {
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
    .active {
      background-color: #108f00;
    }
  }
</style>