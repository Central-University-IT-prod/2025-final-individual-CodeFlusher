<script lang="ts" setup>

const props = defineProps({
  previousExp: {
    type: Number,
    default: 0
  },
  currentExp: {
    type: Number,
    default: 0
  }
})

</script>

<template>
  <div class="flex flex-col m-auto">
    <h1 class="text-[32px] lg:text-[48px] font-bold mx-auto text-white">Получен опыт</h1>
    <p class="text-[24px] lg:text-[32px] w-full text-center text-white">
      {{ previousExp }} -> {{ currentExp }}
    </p>
    <span
        class="text-accent hover:text-accent-tinted transition duration-300 mx-auto font-bold text-[24px] lg:text-[32px] cursor-pointer"
        @click="$emit('next')">Далее</span>
  </div>
</template>

<style scoped>

</style>