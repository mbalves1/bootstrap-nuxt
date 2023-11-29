import { defineStore } from 'pinia'
import { getUser } from '../server/api-user.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: '',
    token: '',
    msg: ''
  }),
  actions: {
    async getUserData() {
      const token = localStorage.getItem('token')
      try {
        const response = await getUser(token)
        const data = await response.json()        
        return data
      } catch (error) {
        console.error(error)
        this.msg = 'Error para acessar a informações do usuário!'
      }
    },
  }
})
