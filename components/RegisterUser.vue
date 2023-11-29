<template>
  <v-snackbar
    :timeout="time"
    :color="snackbar.color"
    v-model="snackbar.visible"
  >
    {{ snackbar.label }}
  </v-snackbar>
  <v-row class="w-full sm:w-700px">
    <v-col>
      <div>
        <div @click="goToLogin" class="text-#00B8C5 cursor-pointer">
          <v-icon class="mr-3">mdi-arrow-left</v-icon> Voltar
        </div>
      
        <div>
          <h1 class="my-2 mt-4">Cadastre-se</h1>
          <div class="flex text-sm">
            <div>Já possuí uma conta ?</div>
            <div class="text-#00B8C5 ml-2 font-bold cursor-pointer" @click="goToLogin">Entrar na plataforma</div>
          </div>
        </div>
  
        <div class="my-10 text-sm">
          <v-form ref="formRegister">
            <div>Nome</div>
            <v-text-field
              density="compact"
              variant="outlined"
              class=""
              placeholder="Seu nome"
              required
              :rules="[v => !!v || 'O nome é obrigatório!', rules.name]"
              v-model="newUser.name"
            ></v-text-field>
              
            <div>E-mail</div>
            <v-text-field
              density="compact"
              variant="outlined"
              placeholder="Insira seu e-mail"
              required
              :rules="[v => !!v || 'O e-mail é obrigatório!', rules.email]"
              v-model="newUser.email"
            ></v-text-field>
              
              <v-row>
                <v-col>
                  <div>CPF</div>
                  <v-text-field
                  density="compact"
                  variant="outlined"
                  placeholder="Insira seu CPF"
                  required
                  type="number"
                  hint="Digite sem pontos, apenas números"
                  :rules="[v => !!v || 'O CPF é obrigatório!', rules.cpf]"
                  v-model="newUser.document"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <div>Telefone</div>
                  <v-text-field
                    density="compact"
                    variant="outlined"
                    class=""
                    placeholder="Insira seu telefone"
                    required
                    hint="Digite sem espaços, com DDD na frente ex: 44000000000"
                    type="number"
                    :rules="[v => !!v || 'O telefone é obrigatório!', rules.phone_number]"
                    v-model="newUser.phone_number"
                    ></v-text-field>
                </v-col>
              </v-row>
              
              <v-row no-gutters class="gap-6">
                <v-col>
                <div>Senha</div>
                <v-text-field
                  :type="show1 ? 'text' : 'password'"
                  density="compact"
                  variant="outlined"
                  class=""
                  :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="show1 = !show1"
                  placeholder="Crie uma senha"
                  required
                  :rules="[
                    v => !!v || 'A senha é obrigatório!',
                    rules.password
                  ]"
                  v-model="newUser.password"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <div>Confirme senha</div>
                  <v-text-field
                    :type="show2 ? 'text' : 'password'"
                    density="compact"
                    variant="outlined"
                    class=""
                    placeholder="Repita a senha"
                    required
                    :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="show2 = !show2"
                    :rules="[
                      v => !!v || 'O nome é obrigatório!',
                      v => v === newUser.password || 'A senha não confere!' ]"
                    v-model="newUser.password_confirmation"
                  ></v-text-field>
                </v-col>
            </v-row>

            <v-checkbox
              density="compact"
              color="#00B8C5"
              required
              :rules="[v => !!v || 'O aceite de termos é obrigatória']"
              class="sm:w-700px"
              v-model="newUser.terms"
            >
              <template #label>
                <span class="sm:w-700px text-sm cursor-pointer" @click="openTerms = !openTerms">Li e concordo com os <span class="text-#00B8C5 underline underline-offset-3 font-bold">Termos de uso</span> e a <span class="text-#00B8C5 underline underline-offset-3 font-bold">Política de privacidade</span> do sistema.</span>
              </template>
            </v-checkbox>

            <div>
              <v-btn
                variant="flat"
                class="w-full text-white text-capitalize"
                color="#00B8C5"
                @click="register"
                :loading="loading"
              >
                <div style="">
                  Criar conta
                </div>
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
// Layout page
definePageMeta({
  layout: 'layoutPattern'
})

// Pinia
const { createRegister } = useAuthStore()

// variables
const emit = defineEmits(['register-user'])
const formRegister = ref(null)
const show1 = ref(false)
const show2 = ref(false)
const loading = ref(false)
const rules = ref({
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido!.'
  },
  cpf: value => {
    const pattern = /^[0-9]{11}$/
    return pattern.test(value) || 'Invalid CPF.'
  },
  name: value => {
    const pattern = /^[\wà-ü']{2,}(\s+[\wà-ü']{2,})+$/
    return pattern.test(value) || 'Nome deve ter pelo menos dois nomes.'
  },
  password: value => {
    return value.length >= 8 || 'A senha deve ter pelo menos 8 caracteres!'
  },
  phone_number: value => {
    const pattern = /^[1-9]{2}[0-9]{9}$/
    return pattern.test(value) || 'O telefone deve ter 13 números!'
  }
})

const snackbar = ref({
  visible: false,
  label: '',
  color: '',
  time: ''
})

const newUser = ref({
  name: '',
  email: '',
  document: '',
  phone_number: '',
  password: '',
  password_confirmation: '',
  terms: false
})

const goToLogin = () => {
  emit('login-page', true)
}

const register = async () => {
  const { valid } = await formRegister.value.validate()
  const payload = {
    ...newUser.value,
    phone_number: 55 + newUser.value.phone_number
  }
  if (valid) {
    loading.value = true
    try {
      const response = await createRegister(payload)
      loading.value = false
      snackbar.value ={
        visible: true,
        label: 'Usuário criado com sucesso!',
        color: '#00B8C5',
        time: 5000
      } 
      if (response.data.token) {
        useTimeoutFn(() => {
          emit('login-page', true)
        }, 3000)
      } else {
        snackbar.value ={
          visible: true,
          label: `${response.message}, ${response.data?.email?.[0] || '' } ${response.data?.document?.[0] || '' }`,
          color: 'red',
          time: 11000
        }
      }
      return response
    }
    catch(error) {
      console.error("Error:", error)
      loading.value = false
      snackbar.value ={
        visible: true,
        label: 'Erro ao criar usuário!',
        color: 'red'
      }
      console.error(error)
    }
  }
}
</script>