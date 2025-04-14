<script lang="ts" setup>

const props = defineProps({
  emoji: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

</script>

<template>
  <div class="flex gap-2">
    <h4 class="text-[16px] h-[22px] aspect-square">{{ emoji || '✏️' }}</h4>
    <h4 class="text-[16px] text-subtitle">{{ text }}</h4>
  </div>
</template>

<style scoped>

</style>