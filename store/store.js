import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => ({
    user: 'Murilo',
  }),
  actions: {
    aquiUser() {
      console.log('Aqui')
      return this.user
    }
  }
})
