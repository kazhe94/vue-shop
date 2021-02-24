<template>
  <form class="card">
    <div :class="['form-control', {invalid: nError}]">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" @blur="nBlur">
      <small v-if="nError">{{ nError }}</small>
    </div>

    <div :class="['form-control', {invalid: eError}]">
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
        :disabled="isSubmitting"
        @click="signUp"
    >
      Зарегистрироваться
    </button>
  </form>
</template>

<script>

import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {useSignUpForm} from "@/use/signup-form";
export default {
  name: "Auth",
  emits:['created'],
  setup(_, {emit}) {
    const route = useRoute()
    const store = useStore()

    const submit = async (values)=> {
      try {
        console.log(values)
        await store.dispatch('auth/signUp', values)
        emit('created')
      } catch (e) {}
    }
    return {
      ...useSignUpForm(submit)
    }
  }
}
</script>

<style scoped>

</style>