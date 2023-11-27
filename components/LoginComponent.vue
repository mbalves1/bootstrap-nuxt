<template>
  <div class="grid grid-cols-2 sm:ml-10">
    <v-row>
      <v-col>
        <div class="bg-white w-500px h-500px rounded-lg px-10">
          <div class="flex align-center py-10 bg-white rounded-lg">
            <img src="/petlogo.png" class="w-50px"/>
            <div class="font-bold bg-white">
              <h3 class="text-#00B8C5 ml-3" style="background-color: white;">Bitzen Pet</h3>
            </div>
          </div>
          
          <div class="bg-white">
            <div class="bg-white font-bold text-xl">
              Entrar na plataforma
            </div>
            <div class="flex text-sm my-3 bg-white">
              <p class="bg-white">Não tem uma conta?</p>
              <div
                class="ml-2 font-bold text-#00B8C5 cursor-pointer"
                style="background-color: white;"
                @click="goToRegister"
              >Cadastre-se gratuitamente</div>
            </div>
          </div>

          <div class="mt-10 bg-white">
            <div class="bg-white text-sm bg-white" >Email</div>
            <v-text-field density="compact" variant="outlined" class="bg-white" style="background-color: white;" placeholder="Seu email" ></v-text-field>

            <div class="bg-white text-sm">Senha</div>
            <v-text-field density="compact" variant="outlined" style="background-color: white;" placeholder="Sua senha"></v-text-field>

            <span class="flex justify-between align-center bg-white">
              <v-checkbox label="Manter conectado" hide-details="" class="bg-white"></v-checkbox>

              <p class="text-#00B8C5 font-bold">Esqueceu sua senha?</p>
            </span>

            <div class="mt-5">
              <v-btn variant="flat" class="w-100% text-capitalize" color="#00B8C5">
                <div class="text-white text-xs">Entrar na plataforma</div>
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
      <v-col>
        <div></div>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
const emit = defineEmits(['register-user'])

const goToRegister = () => {
  console.log("chamou")
  emit('register-user', false)
}
</script>
<style lang="scss" scoped>
// * {
//   background: white;
// }
</style>
