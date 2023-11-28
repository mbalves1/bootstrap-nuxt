import { defineStore } from 'pinia'
import { getListPets, postPet, getPet, putPet, deletePet } from '../server/api-pets.js'

export const usePetsStore = defineStore('pets', {
  state: () => ({
    user: '',
    token: '',
    msg: ''
  }),
  actions: {
    async getLists() {
      const token = localStorage.getItem('token')
      try {
        const response = await getListPets(token)
        const data = await response.json()        
        return data
      } catch (error) {
        console.error(error)
        this.msg = 'Error para acessar a lista'
      }
    },
    async getPet(id) {
      const token = localStorage.getItem('token')
      try {
        const response = await getPet(id, token)
        const data = await response.json()        
        return data
      } catch (error) {
        console.error(error)
        this.msg = 'Erro ao buscar o pet'
      }
    },
    async createPet(payload) {
      const token = localStorage.getItem('token')
      try {
        const response = await postPet(payload, token)
        
        return response
      } catch (error) {
        console.error(error)
        this.msg = 'Error para criar um pet'
      }
    },
    async updatePet(params) {
      const token = localStorage.getItem('token')
      try {
        const response = await putPet(params, token)
        
        return response
      } catch (error) {
        console.error(error)
        this.msg = 'Error para atualizar o pet'
      }
    },
    async removePet(id) {
      const token = localStorage.getItem('token')
      try {
        const response = await deletePet(id, token)
        
        return response
      } catch (error) {
        console.error(error)
        this.msg = 'Error para deletar o pet'
      }
    },
  }
})
