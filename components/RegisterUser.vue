<template>
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
          <form>
            <div>Nome</div>
            <v-text-field
              density="compact"
              variant="outlined"
              class=""
              placeholder="Seu nome"></v-text-field>

            <div>E-mail</div>
            <v-text-field
              density="compact"
              variant="outlined"
              class=""
              placeholder="Insira seu e-mail"></v-text-field>

            <v-row>
              <v-col>
                <div>CPF</div>
                <v-text-field
                  density="compact"
                  variant="outlined"
                  class=""
                  placeholder="Insira seu CPF"></v-text-field>
              </v-col>
              <v-col>
                <div>Telefone</div>
                <v-text-field
                  density="compact"
                  variant="outlined"
                  class=""
                  placeholder="Insira seu telefone"></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters class="gap-6">
              <v-col>
                <div>Senha</div>
                <v-text-field
                  density="compact"
                  variant="outlined"
                  class=""
                  type="password"
                  placeholder="Crie uma senha"></v-text-field>
              </v-col>
              <v-col>
                  <div>Confirme senha</div>
                  <v-text-field
                  type="password"
                  density="compact"
                  variant="outlined"
                  class=""
                  placeholder="Repita a senha"></v-text-field>
              </v-col>
            </v-row>

            <v-checkbox
              density="compact"
              color="#00B8C5"
              required
              :rules="[v => !!v || 'O aceite de termos é obrigatória']"
              class="sm:w-700px" 
            >
              <template #label>
                <span class="sm:w-700px text-sm cursor-pointer" @click="openTerms = !openTerms">Li e concordo com os <span class="text-#00B8C5 underline underline-offset-3 font-bold">Termos de uso</span> e a <span class="text-#00B8C5 underline underline-offset-3 font-bold">Política de privacidade</span> do sistema.</span>
              </template>
            </v-checkbox>

            <div>
              <v-btn variant="flat" class="w-full text-white text" color="#00B8C5">
                <div style="">
                  Criar conta
                </div>
              </v-btn>
            </div>
          </form>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
const emit = defineEmits(['register-user'])

const goToLogin = () => {
  emit('login-page', true)
}
</script>