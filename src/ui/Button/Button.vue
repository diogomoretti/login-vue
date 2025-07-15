<script setup lang="ts">
  const props = defineProps<{
    type: 'button' | 'logout'
    disabled?: boolean
    click?: () => void
  }>()
</script>

<template>
  <button
    :class="['button', props.type, { 'button-disabled': props.disabled }]"
    :disabled="props.disabled"
    @click="props.click"
  >
    <slot />
    <svg width="36" height="26" viewBox="0 0 36 26" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.2319 0.46981C24.0022 0.187342 23.6654 0.0172742 23.3061 0.0014469C22.9469 -0.0158469 22.5974 0.122502 22.3424 0.383369C22.0888 0.642779 21.9535 1.00019 21.969 1.36769C21.9859 1.73518 22.1522 2.07962 22.4283 2.31452L31.6306 11.7382H1.21597C0.534024 11.7743 0 12.3508 0 13.0497C0 13.7472 0.534024 14.3237 1.21597 14.3612H31.6306L22.4142 23.772C21.9324 24.2879 21.9324 25.1007 22.4142 25.6166C22.6524 25.8616 22.9778 26 23.316 26C23.6542 26 23.9782 25.8616 24.2178 25.6166L35.6168 13.9575L35.6153 13.959C35.8605 13.7169 36 13.384 36 13.0366C36 12.6879 35.8605 12.355 35.6153 12.1143L24.2319 0.46981Z" />
    </svg>
  </button>
</template>

<style scoped>
  .button {
    position: relative;
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    padding-right: 4.6rem;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    border: 0;
    outline: 0;
    border-radius: 3rem;
    cursor: pointer;
    transition: all .5s ease-in-out;
  }

  .button:hover {
    background-color: color-mix(in srgb, var(--color-primary) 85%, transparent);
  }

  .button-disabled {
    pointer-events: none;
    opacity: .2;
  }

  .logout {
    background-color: var(--color-error);
  }

  .logout:hover {
    background-color: color-mix(in srgb, var(--color-error) 85%, transparent);
  }

  svg {
    position: absolute;
    top: 0;
    right: 1.8rem;
    width: 100%;
    height: 100%;
    max-width: 1.6rem;
  }
</style>
