<template>
  <div class="card">
    <h1>Войти в систему</h1>
    <app-form></app-form>
  </div>
</template>

<script>

import AppForm from "@/components/ui/AppForm";
export default {
  name: "Auth",
  components: {
    AppForm
  }
}
</script>

<style scoped>

</style>