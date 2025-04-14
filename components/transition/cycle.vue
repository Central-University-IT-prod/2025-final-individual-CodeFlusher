<script lang="ts" setup>

</script>

<template>
  <transition appear name="cycle">
    <slot></slot>
  </transition>
</template>

<style scoped>

.cycle-enter-active, .cycle-leave-active {
  transition: 1s cubic-bezier(.25, .8, .25, 1);
}

.cycle-enter-from {
  transform: translateX(5rem);
  opacity: 0;
}

.cycle-leave-to {
  transform: translateX(-5rem);
  opacity: 0;
}

.cycle-enter-to, .cycle-leave-from {
  transform: translateX(0);
  opacity: 1;
}


</style>