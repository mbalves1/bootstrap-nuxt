import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => ({
    user: 'Murilo',
  }),
  actions: {
    aquiUser() {
      return this.user
    }
  }
})
