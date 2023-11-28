<template>
  <v-row class="">
    <v-col class="pt-0" cols="12" lg="3">
      <div class="border-dashed w-full h-250px text-grey rounded">
        <v-file-input
          prepend-icon="mdi-camera"
          class=""
          variant="outline"
          type="file"
          style="height: 500px;"
          accept="image/jpg, image/jpeg, image/png"
          @change="handleFileInput"
        ></v-file-input>
      </div>
    </v-col>
    <v-col cols="12"  lg="9" class="pt-0">
      <v-form class="border bg-white rounded-lg pl-5  py-5">
        <v-col cols="12" lg="6">
          <div class="text-sm mb-2 font-bold">Nome</div>
          <v-text-field
            density="compact"
            variant="outlined"
            placeholder="Nome do pet"
            v-model="newPet.name"
          >
          </v-text-field>
          <div class="text-sm mb-2 font-bold">Cor</div>
          <v-text-field
            density="compact"
            variant="outlined"
            placeholder="Cor do pet"
            v-model="newPet.color"
          >
          </v-text-field>
          <div class="text-sm mb-2 font-bold">Data de nascimento</div>
          <v-text-field
            append-iner-icon="mdi-calendar"
            type="date"
            density="compact"
            variant="outlined"
            placeholder="Selecione"
            v-model="newPet.birthdate"
          >
          </v-text-field>
          <div class="text-sm mb-2 font-bold">Sobre o pet</div>
          <v-textarea
            density="compact"
            variant="outlined"
            placeholder="Escreva um pequeno texto sobre o pet"
            v-model="newPet.description"
          >
          </v-textarea>
        </v-col>
      </v-form>

      <div class="">
        <v-btn
          color="#00B8C5"
          variant="flat"
          class="w-full rounded-lg my-10 text-capitalize text-white"
          height="44"
          @click="sendRegister"
        >Salvar</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>

const { createPet } = usePetsStore()

const newPet = ref({
  name: '',
  color: '',
  birthdate: '',
  description: '',
  image: ''
})

const im = ref()

const handleFileInput = event => {
  console.log("event1")
  console.log("event", event.target.files)
  im.value = event.target.files[0]
}

const sendRegister = async () => {
  const fd = new FormData()
  fd.append('image', im.value)
  console.log("fd", fd)
  const payload = {
    ...newPet.value,
    image: fd
  }
  console.log("payload", payload)
  await createPet(payload)
}

</script>
