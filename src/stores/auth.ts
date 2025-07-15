import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL: string = 'https://dummyjson.com'
const TOKEN_KEY: string = 'token'

interface User {
  id: number;
  username: string;
  email: string;
  accessToken: string;
  firstName: string;
  lastName: string;
  image: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  async function login(username: string, password: string) {
    try {
      const response = await axios.post<User>(`${API_URL}/auth/login`, {
        username,
        password,
      })
      user.value = response.data
      localStorage.setItem(TOKEN_KEY, response.data.accessToken)
      return true
    } catch (error) {
      console.error('Error on login:', error)
      return false
    }
  }

  async function fetchUser() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      try {
        const response = await axios.get<User>(
          `${API_URL}/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        user.value = response.data
        return true
      } catch (error) {
        console.error('Error on fetch user:', error)
        logout()
        return false
      }
    }
    return false
  }

  function logout() {
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  return { user, login, fetchUser, logout }
})
