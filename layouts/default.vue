<script lang="ts" setup>

const headerRef = ref<HTMLDivElement>();

const computeHeight = computed(() => {
  if (!headerRef.value) {
    return 0;
  }
  return headerRef.value.getBoundingClientRect().height;
})

</script>

<template>
  <div ref="headerRef" class="fixed w-full z-20 ">
    <LazyHeader :height="computeHeight"></LazyHeader>
  </div>
  <div class="w-full flex">
    <div :style="{
      marginTop: `${computeHeight}px`,
      minHeight: `calc(100vh - ${computeHeight}px)`,
      transition: 'margin 0ms'
    }" class="flex w-full max-lg:p-4">
      <slot></slot>
    </div>
  </div>

</template>

<style scoped>

</style>