<script lang="ts" setup>

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div
      :class="active ? 'border-accent-tinted bg-accent-dark' : 'border-primary'"
      class="rounded-full h-5 w-5 border-accent absolute translate-y-2/5 pointer-events-none border-5 ring-2 ring-secondary">

  </div>
</template>

<style scoped>

</style>