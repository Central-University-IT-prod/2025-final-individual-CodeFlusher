<script lang="ts" setup>

const props = defineProps({
  delay: {
    type: String,
    default: '0ms'
  }
})


</script>

<template>

  <transition :style="`transition-delay: ${delay}`" appear name="context-appear">
    <slot></slot>
  </transition>

</template>

<style scoped>

.context-appear-enter-active, .context-appear-leave-active {
  transition: 500ms;
}

.context-appear-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}

.context-appear-leave-from {
  pointer-events: none;
  opacity: 100%;
  transform: translateY(0rem);
}

.context-appear-enter-to {
  opacity: 100%;
  transform: translateY(0rem);
}

.context-appear-leave-to {
  pointer-events: none;
  opacity: 0;
  filter: blur(2rem);
}
</style>