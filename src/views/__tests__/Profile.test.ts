import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Profile from '../Profile.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Login', component: { template: '<div>Login</div>' } },
  { path: '/profile', name: 'Profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function factory() {
  return mount(Profile, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
        router,
      ],
      stubs: ['motion-div'],
    },
  })
}

describe('Profile.vue', () => {
  beforeEach(async () => {
    router.push('/profile')
    await router.isReady()
  })

  it('shows loading when no user is authenticated', () => {
    const wrapper = factory()
    const authStore = useAuthStore()
    authStore.user = null
    expect(wrapper.text()).toContain('Loading...')
  })

  it('shows user data when authenticated', async () => {
    const wrapper = factory()
    const authStore = useAuthStore()
    authStore.user = {
      id: 1,
      username: 'emilys',
      email: 'emily@email.com',
      accessToken: 'token',
      firstName: 'Emily',
      lastName: 'Smith',
      image: 'https://example.com/image.jpg',
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h1').text()).toBe('Emily')
    expect(wrapper.find('p').text()).toBe('emily@email.com')
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/image.jpg')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('logs out and redirects to /', async () => {
    const wrapper = factory()
    const authStore = useAuthStore()
    authStore.user = {
      id: 1,
      username: 'emilys',
      email: 'emily@email.com',
      accessToken: 'token',
      firstName: 'Emily',
      lastName: 'Smith',
      image: 'https://example.com/image.jpg',
    }
    authStore.logout = vi.fn()
    const pushSpy = vi.spyOn(router, 'push')
    await wrapper.vm.$nextTick()
    await wrapper.find('button').trigger('click')
    expect(authStore.logout).toHaveBeenCalled()
    expect(pushSpy).toHaveBeenCalledWith('/')
  })
})
