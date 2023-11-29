<template>
  <v-snackbar
    :timeout="time"
    :color="snackbar.color"
    v-model="snackbar.visible"
  >
    {{ snackbar.label }}
  </v-snackbar>
  <v-form ref="createFormRef">
    <v-row class="">
      <v-col class="pt-0" cols="12" lg="3">
        <div class="border-dashed w-full rounded text-grey">
          <v-file-input
            prepend-icon="mdi-camera"
            show-size
            variant="outline"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            required
            :rules="[v => !!v || 'A imagem é obrigatória!']"
            @change="handleFile"
          ></v-file-input>
        </div>
      </v-col>
      <v-col cols="12" lg="9" class="pt-0">
        <div class="border bg-white rounded-lg pl-5  py-5">
          <v-col cols="12" lg="6">
            <div class="text-sm mb-2 font-bold">Nome</div>
            <v-text-field
              density="compact"
              variant="outlined"
              placeholder="Nome do pet"
              required
              :rules="[v => !!v || 'O nome é obrigatório!']"
              v-model="newPet.name"
              >
            </v-text-field>
            <div class="text-sm mb-2 font-bold">Cor</div>
            <v-text-field
              density="compact"
              variant="outlined"
              placeholder="Cor do pet"
              required
              :rules="[v => !!v || 'A cor é obrigatória!']"
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
              required
              :rules="[v => !!v || 'A data de nascimento é obrigatória!']"
              v-model="newPet.birthdate"
            >
            </v-text-field>
            <div class="text-sm mb-2 font-bold">Sobre o pet</div>
            <v-textarea
              density="compact"
              variant="outlined"
              required
              :rules="[v => !!v || 'A descrição é obrigatória!']"
              placeholder="Escreva um pequeno texto sobre o pet"
              v-model="newPet.description"
            >
            </v-textarea>
          </v-col>
        </div>

        <div class="">
          <v-btn
            color="#00B8C5"
            variant="flat"
            class="w-full rounded-lg my-10 text-capitalize text-white"
            height="44"
            @click="sendRegister"
            :loading="loading"
          >Salvar</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup>

const { createPet } = usePetsStore()

const loading = ref(false)
const createFormRef = ref(null)
const inputFile = ref()

const newPet = ref({
  name: '',
  color: '',
  birthdate: '',
  description: '',
  image: ''
})

const snackbar = ref({
  visible: false,
  label: '',
  color: '',
  time: 11000
})

const handleFile = (item) => {
  inputFile.value = item.target.files[0]
}

const sendRegister = async () => {
  const { valid } = await createFormRef.value.validate()
  if (valid) {    
    let formData = new FormData()
    const imageFile = inputFile.value
    const imageBlob = new Blob([imageFile], { type: imageFile.type })
    formData.append('image', imageBlob)
    const imgFile = formData.get('image')
    loading.value = true
    
    const payload = {
      ...newPet.value,
      image: imgFile
    }

    try {
      const response = await createPet(payload)
      if (response.status === 422) {
        loading.value = false
        snackbar.value ={
          visible: true,
          label: 'Os dados fornecidos são inválidos. Por favor, tente novamente!',
          color: 'red',
        }
      } else {
        loading.value = false
      }
      return response
    }
    catch (error) {
      loading.value = false
      console.error(error)
    }
  }
}

</script>
