<template>
  <form class="card">
    <div :class="['form-control', {invalid: pError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]" >
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button
        class="btn primary"
        :disabled="isSubmitting || isTooManyAttempts"
        @click="onSubmit"
    >
      Войти
    </button>
    <div class="text-danger" v-if="isTooManyAttempts">Слишком много попыток. Попробуйте позже</div>
  </form>
</template>

<script>

import {useRoute} from "vue-router";
import {useRouter} from 'vue-router'
import {useStore} from "vuex";
import {useLoginForm} from "@/use/login-form";
import {error} from "@/utils/error";
import {computed, ref} from "vue";
export default {
  name: "Auth",
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    if(route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }

    const submit = async (values)=> {
        try {
          await store.dispatch('auth/login', values)
          // const user = computed(()=> store.getters['auth/user'])
          //
          // if(user.value.role === 'admin') {
          //   await router.push('/admin')
          // }
          // if(user.value.role === 'user') {
          //   await router.push('/')
          // }
        } catch (e) {}
    }

    return {
      ...useLoginForm(submit)
    }
  }
}
</script>

<style scoped>

</style>