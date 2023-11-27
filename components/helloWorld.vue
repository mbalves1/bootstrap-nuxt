<template>
  <div>
    Heeeelloo {{ name }}
  </div>
</template>
<script setup>
const { aquiUser, user } = useStore()
const name = ref('')

onMounted(() => {
  const m = aquiUser()
  const use = user
  console.log("user", m)
  console.log("ur", use)
  name.value = user
})
</script>