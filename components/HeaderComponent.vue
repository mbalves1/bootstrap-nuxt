<template>
  <v-container class="py-0" style="background: white !important;">
    <div class="flex items-center justify-between border-bottom my-3" style="bg-white">
      <div class="flex items-center">
        <img src="/petlogo.png" class="w-50px"/>
        <div class="font-bold bg-white">
          <h3 class="text-#00B8C5 ml-3" style="background-color: white;">Bitzen Pet</h3>
        </div>
        <div class="ml-8 border-2 cursor-pointer">
          <div class="text-lowercase" @click="gotohome" >Início</div>
        </div>
      </div>

      <div class>
        <div class="rounded-1/2 bg-#f2f2f2 text-sx pa-5">AM</div>
      </div>
    </div>
  </v-container>
  <v-divider></v-divider>
  <v-container>
    <div class="text-xl font-extrabold">{{ title }}</div>
  </v-container>
  <v-divider style="border-bottom: 2px solid grey"></v-divider>
</template>
<script setup>
definePageMeta({
  layout: 'home'
})

const emit = defineEmits(['goto'])

const props = defineProps({
  title: {
    type: String,
    default: 'Seus pets'
  }
})

const gotohome = () => {
  emit('goto', true)
}
</script>
