<script lang="ts" setup>

const props = defineProps({
  url: {
    type: String,
    default: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  }
})

</script>

<template>
  <iframe :src="url"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="w-full aspect-video rounded-3xl overflow-hidden"
          frameborder="0" referrerpolicy="strict-origin-when-cross-origin"></iframe>
</template>

<style scoped>

</style>