<template>
  <div class="breadcrumbs" v-if="back">
    <button class="text-white" @click="$router.back()">Вернуться на главную</button>
  </div>
  <div class="card" :class="{center: center}">
    <h1 class="card-title">
      {{ title }}
      <slot name="header"></slot>
    </h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppPage",
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Online Shop`
  }
}
</script>

<style scoped>
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
</style>