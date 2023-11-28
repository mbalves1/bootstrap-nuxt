<template>
  <div>
    <v-slide-y-reverse-transition hide-on-leave>
      <LoginComponent @register-user="showPage" v-if="show"></LoginComponent>
      <RegisterUser @login-page="showPage" v-else></RegisterUser>
    </v-slide-y-reverse-transition>
  </div>
</template>
<script setup>
const show = ref(true)
const showPage = (params) => {
  console.log('oparams', params)
  show.value = params
}
</script>