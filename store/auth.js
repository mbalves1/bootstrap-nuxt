import { defineStore } from 'pinia'
import { postResgister, postLogin } from '../server/api-auth.js'

export const useAuthStore = defineStore('authentication', {
  state: () => ({
    user: '',
    token: '',
    msg: ''
  }),
  actions: {
    async createRegister(payload) {
      try {
        const response = await postResgister(payload)
        
        return response
      } catch (error) {
        this.msg = 'Error while registering user'
      }
    },
    async loginIn(payload) {
      try {
        const response = await postLogin(payload)
        const { data } = response

        localStorage.setItem('token', data.token)
        return response
      } catch (error) {
        console.error(error)
        this.msg = 'Error login'
      }
    }
  }
})
