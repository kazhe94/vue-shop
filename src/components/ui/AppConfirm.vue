<template>
  <app-modal :title="title" @click="$emit('reject')">
    <button class="btn primary" @click="$emit('confirm')">Да</button>
    <button class="btn danger" @click="$emit('reject')">Нет</button>
  </app-modal>
</template>

<script>
import AppModal from "@/components/ui/AppModal";

export default {
  name: "AppConfirm",
  props: ['title'],
  emits: ['reject', 'confirm'],
  components: {
    AppModal
  }
}
</script>

<style scoped>

</style>