<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { motion } from 'motion-v'

import { Input, Button } from '@/ui'

interface LoginForm {
  username: string;
  password: string;
}

const form = ref<LoginForm>({
  username: '',
  password: '',
})

const errorMessage = ref<string>('')
const isLoading = ref<boolean>(false)

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const success = await authStore.login(form.value.username, form.value.password)

  if (success) {
    router.push('/profile')
  } else {
    errorMessage.value = 'Login failed. Please check your credentials.'
    form.value.username = ''
    form.value.password = ''
    isLoading.value = false
  }
}
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, scale: 0 }"
    :animate="{ opacity: 1, scale: 1 }"
    :transition="{
      duration: 0.5,
      scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 }
    }"
  >
    <div class="login-container">

      <h1>Login to your account</h1>

      <motion.div
        v-if="errorMessage"
        :initial="{ opacity: 0, y: -50 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -50 }"
        :transition="{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01] }"
      >
        <p class="error">
          {{ errorMessage }}
        </p>
      </motion.div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <Input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Enter your username (ex: emilys)"
            required
          />
        </div>
        <div class="form-group">
          <Input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter your password (ex: emilyspass)"
            required
          />
        </div>
        <div class="form-group">
          <Button
            type="button"
            :disabled="isLoading"
            :click="handleLogin"
          >
            {{ isLoading ? 'Loading...' : 'Login' }}
          </Button>
        </div>
      </form>
    </div>
  </motion.div>
</template>

<style scoped>
  .form-group {
    padding-block: 1rem;
  }

  .login-container {
    max-width: 40rem;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .error {
    color: var(--color-error);
    font-size: 1.4rem;
    font-family: var(--font-default);
    margin-bottom: 1rem;
  }
</style>
