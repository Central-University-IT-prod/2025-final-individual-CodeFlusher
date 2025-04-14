<script lang="ts" setup>

</script>

<template>
  <Transition :duration="2000" appear name="title">
    <slot></slot>
  </Transition>
</template>

<style scoped>
.title-enter-active {
  animation: title 2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.title-leave-active {
  animation: title 2s cubic-bezier(0.25, 0.8, 0.25, 1) reverse;
}

@keyframes title {
  0% {
    top: calc(50vh);
    opacity: 0;
    scale: 0.5;
    transform: translateY(-100%);
  }
  35% {
    top: calc(50vh);
    opacity: 1;
    scale: 1;
    transform: translateY(-100%);
  }
  100% {
    top: calc(0vh);
    transform: translateY(0);
  }
}
</style>