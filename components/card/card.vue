<script lang="ts" setup>

const props = defineProps({
  hoverable: {
    type: Boolean,
    default: false
  },
  primary: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div
      :class="`${hoverable ? 'hover:bg-accent/70 hover:dark:bg-accent/60' : ''} ${!primary ? 'bg-accent/40 dark:bg-accent/40' : 'bg-primary'}`"
      class="rounded-3xl transition-colors duration-300">
    <slot></slot>
  </div>
</template>

<style scoped>

</style>