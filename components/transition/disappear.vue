<script lang="ts" setup>

const props = defineProps({
  delay: {
    type: String,
    default: '0ms'
  }
})

</script>

<template>

  <transition :style="{
    transitionDelay : delay
  }" appear name="disappear">
    <slot></slot>
  </transition>

</template>

<style scoped>

.disappear-enter-active, .disappear-leave-active {
  transition: 500ms;
}

.disappear-enter-from {
  opacity: 0;
}

.disappear-leave-from {
  pointer-events: none;
  opacity: 100%;
}

.disappear-enter-to {
  opacity: 100%;
}

.disappear-leave-to {
  pointer-events: none;
  opacity: 0;
  filter: blur(2rem);
}
</style>