<template>
  <div class="flex flex-col items-center justify-center mt-4">
    <v-card variant="flat" class="bg-white border w-full rounded-lg" max-width="500">
      <div class="font-bold text-base pa-5">Meus dados</div>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-col>
            <div>Nome</div>
            <v-text-field
              variant="outlined"
              density="compact"
              v-model="user.name"
              ></v-text-field>
              <div>Email</div>
              <v-text-field
              variant="outlined"
              density="compact"
              v-model="user.email"
              ></v-text-field>
              <v-btn
              color="#00B8C5"
              variant="flat"
              class="w-full rounded-lg my-10 text-capitalize text-white"
              height="44"
            >Salvar</v-btn>
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="flex justify-between bg-white border rounded-lg sm:w-500px mt-7 pa-6">
      <div>Senha</div>
      <div class="flex items-center text-#00B8C5">
        <v-icon class="mr-2">mdi-pencil-box-outline</v-icon>
        Alterar
      </div>
    </div>

    <div class="flex justify-between bg-white border rounded-lg sm:w-500px mt-7 pa-6">
      <div class="flex items-center text-red">
        <v-icon class="flex mr-2" style="transform: rotate(180deg);">mdi-login</v-icon>
        <div class="font-bold text-red">Sair da minha conta</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const user = ref({
  name: '',
  email: ''
})

onMounted(() => {
  const userStore = JSON.parse(localStorage.getItem('user'))
  user.value.name = userStore.name
  user.value.email = userStore.email
})
</script>