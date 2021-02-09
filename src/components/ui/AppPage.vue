<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Вернуться на главную</router-link>
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

</style>