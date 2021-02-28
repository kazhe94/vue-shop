<template>
  <app-page :title="'Личный кабинет ' + user.name"></app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import {useStore} from "vuex";
import {computed} from "vue";
export default {
  name: "Account",
  components: {
    AppPage
  },
  setup() {
    const store = useStore()
    const user = computed(()=> store.getters['auth/user'])

    return {
      user
    }
  }
}
</script>

<style scoped>

</style>