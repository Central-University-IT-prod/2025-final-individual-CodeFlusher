<script lang="ts" setup>

const props = defineProps({
  delay: {
    type: Number,
    default: 0
  }
})

</script>

<template>

  <transition :delay="delay" name="bottom-modal">
    <slot>
    </slot>
  </transition>

</template>

<style scoped>

.bottom-modal-enter-active, .bottom-modal-leave-active {
  transition: 500ms;
}

.bottom-modal-enter-to, .bottom-modal-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.bottom-modal-enter-from, .bottom-modal-leave-to  {
  transform: translateY(50rem);
  opacity: 0;
  pointer-events: none;
}

</style>