<template>
  <v-snackbar
    :timeout="3000"
    :color="snackbar.color"
    v-model="snackbar.visible"
  >
    {{ snackbar.label }}
  </v-snackbar>
  <!-- <div class="flex items-center justify-center"></div> -->
  <div class="grid grid-cols-2 sm:ml-10">
    <v-row>
      <v-col>
        <div class="bg-white w-500px h-auto rounded-lg px-10 pb-5">
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
            <v-form ref="loginFormRef">
              <div class="bg-white text-sm bg-white" >Email</div>
              <v-text-field
                density="compact"
                variant="outlined"
                class="bg-white"
                style="background-color: white;"
                placeholder="Seu email"
                required
                :rules="[v => !!v || 'O e-mail é obrigatório!', rules.email]"
                v-model="userInfo.email"
                ></v-text-field>
                
                <div class="bg-white text-sm">Senha</div>
                <v-text-field
                density="compact"
                variant="outlined"
                style="background-color: white;"
                placeholder="Sua senha"
                required
                :rules="[v => !!v || 'A senha é obrigatório!', rules.password]"
                v-model="userInfo.password"
              ></v-text-field>
  
              <span class="flex justify-between align-center bg-white">
                <v-checkbox label="Manter conectado" hide-details="" class="bg-white"></v-checkbox>
  
                <p class="text-#00B8C5 font-bold">Esqueceu sua senha?</p>
              </span>
  
              <div class="mt-5 mb-9">
                <v-btn
                  variant="flat"
                  class="w-100% text-capitalize"
                  color="#00B8C5"
                  @click="loginWithEmailAndPass"
                  :loading="loading"
                >
                  <div class="text-white text-xs">Entrar na plataforma</div>
                </v-btn>
              </div>
            </v-form>
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

const router = useRouter()

// Variables
const loginFormRef = ref(null)
const loading = ref(false)
const rules = ref({
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido!.'
  },
  password: value => {
    return value.length >= 8 || 'A senha deve ter pelo menos 8 caracteres!'
  },
})
const userInfo = ref({
  email: '',
  password: ''
})

const snackbar = ref({
  visible: false,
  label: '',
  color: ''
})

// Pinia
const { loginIn } = useAuthStore()

const goToRegister = () => {
  emit('register-user', false)
}

const loginWithEmailAndPass = async () => {
  const { valid } = await loginFormRef.value.validate()
  const payload = {...userInfo.value}
  if (valid) {
    loading.value = true
    try {
      const response = await loginIn(payload)
      loading.value = false
      router.push("/home")
      localStorage.setItem('user', JSON.stringify(response.data.user))
      return response
    }
    catch(error) {
      loading.value = false
      snackbar.value.visible = true
      snackbar.value.label = 'Erro ao Logar, tente novamente!'
      snackbar.value.color = 'red'
      console.error(error)
    }
  }
}
</script>
<style lang="scss" scoped>
// * {
//   background: white;
// }
</style>
