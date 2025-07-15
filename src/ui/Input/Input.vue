<script setup lang="ts">
  const props = defineProps<{
    type: 'text' | 'password' | 'email' | 'number'
    placeholder?: string
    modelValue?: string
    id?: string
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const handleInput = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
  }
</script>

<template>
  <input
    :id="props.id"
    :type="props.type"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    @input="handleInput"
  />
</template>

<style scoped>
  input {
    border: 1px solid color-mix(in srgb, var(--color-primary) 15%, transparent);
    border-radius: 10rem;
    padding: 1.5rem 2rem;
    font-size: 1.6rem;
    font-family: var(--font-default);
    color: var(--color-text);
    background: var(--color-secondary);
    width: 100%;
    outline: 0;
    transition: all .4s ease-out;
  }

  input:focus {
    border-color: color-mix(in srgb, var(--color-primary) 60%, transparent);
    box-shadow: 0 .5rem 2rem 0 color-mix(in srgb, var(--color-primary) 10%, transparent);
  }
</style>
