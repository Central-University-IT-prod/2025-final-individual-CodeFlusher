<script lang="ts" setup>

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  }
})

</script>

<template>

  <transition :delay="delay" name="number">
    <slot>
    </slot>
  </transition>

</template>

<style scoped>

.number-enter-active, .number-leave-active {
  transition: 1s;
}

.number-enter-to, .number-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.number-enter-from {
  transform: translateY(-5rem);
  opacity: 0;
}

.number-leave-to {
  transform: translateY(5rem);
  opacity: 0;
}

</style>