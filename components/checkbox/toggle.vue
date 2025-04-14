<script lang="ts" setup>

const state = defineModel<boolean>('state')

</script>

<template>

  <div class="flex gap-2">
    <div :class="state ? 'bg-accent-tinted' : ''"
         class="rounded-full p-1 border border-subtitle w-14 transition duration-500"
         @click="state = !state">
      <div :class="state ? 'translate-x-[1.8rem]' : 'translate-x-0'"
           class="size-4 bg-secondary border border-subtitle rounded-full transition-['margin'] duration-300"></div>
    </div>
    <slot></slot>
  </div>

</template>

<style scoped>

</style>