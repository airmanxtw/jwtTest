import { defineStore } from 'pinia'
import { ref,  } from 'vue'
export const useStore = defineStore('token', () => {
  const token = ref('') 
  const setToken = (newToken: string) => {
    debugger;
    token.value = newToken
  }
  return { token,setToken }
})