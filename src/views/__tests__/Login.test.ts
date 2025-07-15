import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '../Login.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: { template: '<div>Profile</div>' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function factory() {
  return mount(Login, {
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

describe('Login.vue', () => {
  beforeEach(async () => {
    router.push('/')
    await router.isReady()
  })

  it('renders the login form', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Login to your account')
    expect(wrapper.find('input#username').exists()).toBe(true)
    expect(wrapper.find('input#password').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('logs in successfully and redirects to /profile', async () => {
    const wrapper = factory()
    const authStore = useAuthStore()
    authStore.login = vi.fn().mockResolvedValue(true)
    authStore.fetchUser = vi.fn().mockResolvedValue(true)

    const pushSpy = vi.spyOn(router, 'push')

    await wrapper.find('input#username').setValue('emilys')
    await wrapper.find('input#password').setValue('emilyspass')
    await wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(authStore.login).toHaveBeenCalledWith('emilys', 'emilyspass')
    expect(pushSpy).toHaveBeenCalledWith('/profile')
  })

  it('shows error message when login fails', async () => {
    const wrapper = factory()
    const authStore = useAuthStore()
    authStore.login = vi.fn().mockResolvedValue(false)

    await wrapper.find('input#username').setValue('wronguser')
    await wrapper.find('input#password').setValue('wrongpass')
    await wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()
    expect(authStore.login).toHaveBeenCalledWith('wronguser', 'wrongpass')
    expect(wrapper.text()).toContain('Login failed. Please check your credentials.')
    expect((wrapper.find('input#username').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('input#password').element as HTMLInputElement).value).toBe('')
  })
})
