<script lang="ts" setup>

const props = defineProps({
  delay: {
    type: String,
    default: '0ms'
  }
})

</script>

<template>


  <TransitionGroup name="list-items">
    <slot></slot>
  </TransitionGroup>

</template>

<style scoped>

.list-items-enter-active, .list-items-leave-active {
  transition: 500ms;
}

.list-items-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}

.list-items-enter-to, .list-items-leave-from {
  pointer-events: none;
  opacity: 100%;
  transform: translateY(0rem);
  max-height: calc(25vh);

}

.list-items-leave-to {
  pointer-events: none;
  opacity: 0;
  filter: blur(2rem);
  margin: 0;
  max-height: calc(0vh);
}
</style>