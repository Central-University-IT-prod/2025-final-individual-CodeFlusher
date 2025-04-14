<script lang="ts" setup>

</script>

<template>
  <Transition appear name="bottom">
    <slot></slot>
  </Transition>
</template>

<style scoped>

.bottom-enter-active {
  animation: bottom 2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.bottom-leave-active {
  animation: bottom 2s cubic-bezier(0.25, 0.8, 0.25, 1) reverse;
}

@keyframes bottom {
  0% {
    transform: translateY(5rem);
    opacity: 0;
  }
  35% {
    transform: translateY(5rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>