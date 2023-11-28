<template>
  <div class="flex justify-center mt-4">
    <v-card class="bg-white w-full rounded-lg" max-width="500">
      <div class="font-bold text-base pa-5">Meus dados</div>
      <v-divider></v-divider>
      <v-card-text>
        <v-form>
          <v-col>
            <div>Nome</div>
            <v-text-field
              variant="outlined"
              density="compact"
            ></v-text-field>
            <div>Email</div>
            <v-text-field
              variant="outlined"
              density="compact"
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
  </div>
</template>
<script>
</script>