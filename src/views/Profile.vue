<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { motion } from 'motion-v'
import { Button } from '@/ui'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <motion.div
    :initial="{ transform: 'translateY(100%)', opacity: 0 }"
    :animate="{ transform: 'translateY(0)', opacity: 1 }"
    :transition="{
        duration: 0.4,
        ease: [0, 0.71, 0.2, 1.01]
    }"
  >
    <div class="profile-container">
      <img :src="authStore.user?.image" alt="Profile" class="profile-image">
      <div v-if="authStore.user">
        <h1>{{ authStore.user.firstName }}</h1>
        <p>{{ authStore.user.email }}</p>
        <div class="button-container">
          <Button type="logout" :click="handleLogout">Logout</Button>
        </div>
      </div>
      <p v-else>Loading...</p>
    </div>
  </motion.div>
</template>

<style scoped>
  .profile-container {
    max-width: 40rem;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid color-mix(in srgb, var(--color-primary) 10%, transparent);
  }

  p {
    font-size: 1.6rem;
    font-family: var(--font-default);
    color: var(--color-text);
  }

  .button-container {
    margin-top: 1rem;
  }
</style>
