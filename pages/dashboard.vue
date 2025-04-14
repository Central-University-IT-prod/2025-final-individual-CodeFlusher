<script lang="ts" setup>

useHead({
  title: '',
})

</script>

<template>
  <div class="m-auto">
    <img alt="Mascot"
         class="lg:h-2/3 max-lg:w-2/3 aspect-square absolute left-0 top-0 top-1/2 max-lg:left-1/2 max-xl:-translate-x-1/4 max-lg:-translate-x-1/2 -translate-y-[120%] lg:-translate-y-1/2"
         src="/images/background/mascot.png">
    <LazyMainWelcome class="lg:translate-x-1/3"></LazyMainWelcome>
  </div>
</template>

<style scoped>

</style>