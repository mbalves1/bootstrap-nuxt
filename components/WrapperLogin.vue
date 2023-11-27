<template>
  <div>
    <LoginComponent @register-user="showPage" v-if="show"></LoginComponent>
    <RegisterUser @login-page="showPage" v-else></RegisterUser>
  </div>
</template>
<script setup>
const show = ref(true)
const showPage = (params) => {
  console.log('oparams', params)
  show.value = params
}
</script>