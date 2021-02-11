<template>
  <app-modal :title="title">
    <button class="btn primary">Да</button>
    <button class="btn danger">Нет</button>
  </app-modal>
</template>

<script>
import AppModal from "@/components/ui/AppModal";

export default {
  name: "AppConfirm",
  props: ['title'],
  components: {
    AppModal
  }
}
</script>

<style scoped>

</style>