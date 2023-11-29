<template>
  <v-snackbar
    :timeout="time"
    :color="snackbar.color"
    v-model="snackbar.visible"
  >
    {{ snackbar.label }}
  </v-snackbar>
  <header-component
    @goto="gotohome"
    @gotoprofile="changeContent(4)"
    :title="
      showList ? 'Seus pets': showRegister ? 'Novo pet' : showProfile ? 'Meu perfil' : 'Detalhes'"
  ></header-component>
    <div class="w-full bg-#f2f2f2">
      <div class="w-100 bg-#f2f2f2 h-100vh">
        <v-container v-if="showList" class="flex justify-between">
          <div class="flex w-345px mt-3 mb-2">
            <v-text-field 
              prepend-inner-icon="mdi-magnify"
              label="Pesquisar um pet"
              variant="outlined"
              density="compact"
              class="border-2 bg-white"
              hide-details=""
              disabled
            ></v-text-field>
            <v-btn variant="flat" height="44" color="#00B8C5" class="text-white text-capitalize">Buscar</v-btn>
          </div>
          <div class="mt-3 mb-2">
            <v-btn
              color="#00B8C5"
              variant="flat"
              class="text-white text-capitalize px-6 rounded-lg"
              height="44"
              @click="changeContent(2)"
            >
              <v-icon class="mr-3">mdi-plus-circle-outline</v-icon>
              Cadastrar pet
            </v-btn>
          </div>
        </v-container>

        <v-container>
          <!-- Listar -->
          <div v-if="showList">
            <div class="border rounded-lg bg-white elevation-1">
              <div class="font-bold text-lg py-4 pl-7">Listas de pets</div>
              <v-divider></v-divider>
              <div class="text-lg py-4 pl-7 font-bold text-grey flex justify-between bg-#f2f2f1">
                <div v-for="(head, hx) in headers" :key="hx" class="flex">
                  <div class="w-70px">
                    {{ head.title }}
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div v-for="(pet, px) in array" :key="px">
                <div :class="px%2 === 0 ? '': 'bg-#f2f2f2'" class="flex justify-between items-center py-5 pl-5 pr-10">
                  <img :src="pet.image_url" class="rounded-lg" style="width: 150px;">
                  <div class="w-150px">{{ pet.name }}</div>
                  <div class="w-150px">{{ pet.age }}</div>
                  <div class="w-150px">{{ pet.color }}</div>
                  <div class="flex justify-end gap-2">
                    <div
                      class="pa-1 px-2 border rounded-lg flex items-center cursor-pointer"
                      @click="goToViewDetails(pet)"
                    >
                      <v-icon
                        style="font-size: 20px;"
                        color="grey"
                      >mdi-eye-outline</v-icon>
                    </div>
                    <div
                      class="pa-1 px-2 border rounded-lg flex items-center cursor-pointer"
                      @click="openModalDelete(pet)"
                    >
                      <v-icon color="red" style="font-size: 20px">mdi-delete-outline</v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cadastrar -->
          <div v-if="showRegister" class="mt-8" style="height: 100vh;">
            <register-pet></register-pet>
          </div>

          <!-- Ver detalhes -->
          <div v-if="showViewDetails" style="height: 100vh;">
            <view-pet
              @backToHome="changeView"
              :petData="petDetailsToEvent"
              @send-notification-success="notification"
            ></view-pet>
          </div>

          <!-- Profile -->
          <div v-if="showProfile" style="height: 100vh;">
            <view-profile></view-profile>
          </div>

          <div class="flex items-center">
            <v-dialog v-model="openDeleteItem" max-width="400" top center>
              <div class="bg-white flex items-center rounded-lg">
                <v-card variant="flat">
                  <v-card-title class="font-bold mb-4 mt-2">Deseja deletar o pet?</v-card-title>

                  <v-card-text class="mx-3">
                    <v-row>
                      <img class="w-100px" :src="petToDelete.image_url">
                      <v-col>
                        <div>Nome</div>
                        <div>{{ petToDelete.name }}</div>
                      </v-col>
                      <v-col>
                        <div>Cor</div>
                        <div>{{ petToDelete.color }}</div>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-actions class="mt-5">
                    <div class="w-full flex gap-2">
                      <v-btn
                        class="text-white text-capitalize"
                        variant="flat"
                        color="grey"
                        @click="closeModal"
                        >
                        Cancelar</v-btn>
                        <v-btn
                        class="text-white text-capitalize"
                        variant="flat"
                        color="red"
                        @click="deletePetConfirm"
                        :loading="loading"
                      >Sim, Deletar</v-btn>
                    </div>
                  </v-card-actions>
                </v-card>
              </div>
            </v-dialog>
          </div>
          
        </v-container>
      </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'home'
})
const router = useRouter()
const { getLists, getPet, removePet } = usePetsStore()

// variables
const showList = ref(true)
const showRegister = ref(false)
const showViewDetails = ref(false)
const showProfile = ref(false)
const petDetailsToEvent = ref(null)

// open modal to confirm delete
const openDeleteItem = ref(false)
const petToDelete = ref(null)
const loading = ref(false)

const headers = ref([
  { title: "Pet" },
  { title: "Nome" },
  { title: "Idade" },
  { title: "Cor" },
  { title: "" },
])
const dataPet = ref([])
const array = ref([])

onBeforeMount(() => {
  const hasToken = localStorage.getItem('token')
  if (!hasToken) router.push("/")
})

onMounted(() => {
  fecthPetData()
})

const gotohome = () => {
  changeView(1)
}

const snackbar = ref({
  visible: false,
  label: '',
  color: '',
  time: 4000
})

// Esse metodo tem como objetivo criar um novo metodo para bater individualmente no endpoint por id, assim buscando as indormações de idade e cor que não vem no endpoit onde lista todos os pets
const fecthPet = async () => {
  const dataPetArray = dataPet.value
  const arrayPetId = dataPetArray.map(({id}) => {
    return id
  })

  const mountArray = await Promise.all(arrayPetId.map(id => getPet(id)))

  array.value = []
  return mountArray.map(i => {
    array.value.push(i.data)
  })
}

const fecthPetData = async () => {
  try {
    const { data } = await getLists()
    dataPet.value = data.data

    fecthPet()
    return data
  }
  catch(error) {
    console.error(error)
  }
}

const openModalDelete = (pet) => {
  openDeleteItem.value = true
  petToDelete.value = pet
}

const closeModal = () => {
  openDeleteItem.value = false
}

const goToViewDetails = (petDetails) => {
  changeContent(3)
  petDetailsToEvent.value = petDetails
}

const changeContent = (index) => {
  showList.value = index === 1
  showRegister.value = index === 2
  showViewDetails.value = index === 3
  showProfile.value = index === 4
}

// Metodo controlador de view, o index determina qual pagina vai ser renderizada
const changeView = index => {
  changeContent(index)
}

// Metodo snacbar mensagem
const notification = item => {
  const { color, visible, label } = item
  snackbar.value = {
    color,
    visible,
    label
  }
}

const deletePetConfirm = async () => {
  const { id } = petToDelete.value
  try {
    loading.value= true
    const response = await removePet(id)
    await fecthPetData()
    openDeleteItem.value = false
    loading.value= false

    return response
  } catch (error) {
    loading.value= false
    console.error(error)
  }
}

</script>