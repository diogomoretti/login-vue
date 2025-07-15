import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('should render a button', () => {
    const wrapper = mount(Button)
    expect(wrapper.html()).toContain('button')
  })

  it('should render a button with a type button', () => {
    const wrapper = mount(Button, { props: { type: 'button' } })
    expect(wrapper.html()).toContain('button')
  })

  it('should render a button with a type logout', () => {
    const wrapper = mount(Button, { props: { type: 'logout' } })
    expect(wrapper.html()).toContain('logout')
  })

  it('should render a disabled button', () => {
    const wrapper = mount(Button, { props: { type: 'button', disabled: true } })
    expect(wrapper.html()).toContain('button-disabled')
  })
})
