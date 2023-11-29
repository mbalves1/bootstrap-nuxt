<template>
  <v-row class="flex justify-between">
    <div class="mt-5 mb-5">
      <v-btn
        variant="text"
        class="text-capitalize"
        @click="backTo"
      >
        <v-icon color="#00B8C5" class="mr-2">mdi-arrow-left</v-icon>
        <span class="text-#00B8C5">Voltar</span>
      </v-btn>
    </div>
    <div class="mt-6 mb-5">
      <v-btn
        variant="flat"
        color="#00B8C5"
        class="text-capitalize px-10 flex items-center rounded-lg"
        height="44"
        @click="openToEdit"
      >
        <v-icon color="white" class="mr-2">mdi-pencil-box-outline</v-icon>
        <span class="text-white text-sm">Editar</span>
      </v-btn>
    </div>
  </v-row>

  <v-row class="flex items-start">
    <v-col cols="12" lg="3">
      <div class="">
        <img class="rounded-lg h-185px w-275px" :src="petData.image_url" alt="">
      </div>
    </v-col>
    <v-col cols="12" lg="9" class="pr-0">
      <div v-if="details"
        class="bg-white rounded-lg pa-5 h-185px text-sm font-bold">
        <v-row>
          <v-col cols="12" lg="2">
            <div>Nome</div>
            <div class="text-grey">{{ petData.name }}</div>
          </v-col>
          <v-col cols="12" lg="2">
            <div>Cor</div>
            <div class="text-grey">{{ petData.color }}</div>
          </v-col>
          <v-col>
            <div>Idade</div>
            <div class="text-grey">{{ petData.age }}</div>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col>
            <div>Sobre o pet</div>
            <div class="text-grey">{{ petData.observation }}</div>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <div
          class="bg-white rounded-lg pa-5 text-sm font-bold"
        >
          <v-col cols="12" lg="6">
            <v-form ref="editFormsRef">
              <div>Nome</div>
              <v-text-field
                variant="outlined"
                density="compact"
                class=""
                required
                :rules="[v => !!v || 'O nome é obrigatório!']"
                v-model="petData.name"
              ></v-text-field>
                
              <div>Cor</div>
              <v-text-field
                variant="outlined"
                density="compact"
                class=""
                required
                :rules="[v => !!v || 'A cor é obrigatório!']"
                v-model="petData.color"
                ></v-text-field>
                
                <div>Data de nascimento</div>
                <v-text-field
                  variant="outlined"
                  density="compact"
                  class=""
                  type="date"
                  required
                  :rules="[v => !!v || 'A data de nascimento é obrigatório!']"
                  v-model="petData.birthdate"
                ></v-text-field>

                <div>Sobre o pet</div>
              <v-textarea
                variant="outlined"
                density="compact"
                class=""
                required
                :rules="[v => !!v || 'Essa parte é obrigatório!']"
                v-model="petData.observation"
              ></v-textarea>
            </v-form>
          </v-col>
        </div>
        <div class="w-full">
          <v-btn
            color="#00B8C5"
            variant="flat"
            class="w-full rounded-lg my-10 text-capitalize text-white"
            height="44"
            @click="sendEdit"
            :loading="loading"
          >Salvar</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
const emit = defineEmits(['backToHome', 'sendNotificationSuccess'])
const props = defineProps({
  petData: {
    type: Object,
    default() { return {} }
  }
})

const { updatePet } = usePetsStore()

// Variavel que controla o editar (apenas alterna o content)
const details = ref(true)

const editFormsRef = ref(null)
const loading = ref(false)
const petInfoToEdit = ref({
  name: '',
  birthdate: null,
  color: '',
  observation: ''
})

const backTo = () => {
  emit('backToHome', 1)
}

// abre o forms
const openToEdit = () => {
  details.value = false
}

const sendEdit = async () => {
  const { valid } = await editFormsRef.value.validate()
  petInfoToEdit.value = {
    ...props.petData,
  }
  if (valid) {
    loading.value = true
    try {
      const response = await updatePet(petInfoToEdit.value)
      emit('sendNotificationSuccess', {
        visible: true,
        label: 'Pet editado com sucesso!',
        color: '#00B8C5'
      })
      details.value = true
      loading.value = false
      return response
    }
    catch(error) {
      loading.value = false
      console.error(error)
    }
  }
}
</script>