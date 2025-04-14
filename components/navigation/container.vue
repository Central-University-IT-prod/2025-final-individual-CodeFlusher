<script lang="ts" setup>
const props = defineProps({
  delay: {
    type: String,
    default: '0ms'
  },
})
</script>

<template>
  <TransitionContext :delay="delay">
    <div
        class="p-2 bg-primary rounded-2xl border border-neutral-500/20 w-full flex flex-col transition-colors duration-500">
      <slot></slot>
    </div>
  </TransitionContext>
</template>

<style scoped>

</style>