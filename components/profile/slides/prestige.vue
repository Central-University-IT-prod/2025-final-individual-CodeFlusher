<script lang="ts" setup>

const props = defineProps({
  oldPrestige: {
    type: Number,
    default: 0
  },
  newPrestige: {
    type: Number,
    default: 0
  },
})

const displayPrestige = ref<number>(props.oldPrestige)

setTimeout(() => {
  displayPrestige.value = props.newPrestige
}, 1000)

import {StarIcon} from "@heroicons/vue/24/outline";
</script>

<template>

  <ModalContainer>
    <div class="m-auto flex flex-row -translate-x-1/2">
      <StarIcon class="size-48 text-accent"></StarIcon>
      <div class="h-48 my-auto">
        <TransitionNumber :delay="500">
          <h2 :key="displayPrestige" class="fixed text-[132px] font-extrabold text-accent">{{ displayPrestige }}</h2>
        </TransitionNumber>
      </div>
    </div>
  </ModalContainer>

</template>

<style scoped>

</style>