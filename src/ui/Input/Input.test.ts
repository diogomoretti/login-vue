import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('should render', () => {
    const wrapper = mount(Input)
    expect(wrapper.html()).toContain('input')
  })

  it('should render a input with a type', () => {
    const wrapper = mount(Input, { props: { type: 'text' } })
    expect(wrapper.html()).toContain('input')
  })

  it('should render a input with a value', () => {
    const wrapper = mount(Input, { props: { type: 'text', modelValue: 'test' } })
    expect(wrapper.html()).toContain('test')
  })
})
