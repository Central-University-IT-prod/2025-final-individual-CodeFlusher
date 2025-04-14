<script lang="ts" setup>
const props = defineProps({
  previousLevel: {
    type: Number,
    required: true,
    default: 0
  },
  currentLevel: {
    type: Number,
    required: true,
    default: 0
  }
})

const change = ref<boolean>(false)

setTimeout(() => {
  change.value = true
}, 1000)

const displayLevel = computed(() => {
  return change.value ? props.currentLevel : props.previousLevel
})
</script>

<template>
  <div class="flex flex-col m-auto">
    <h1 class="text-[32px] lg:text-[48px] font-bold mx-auto text-white">Новый уровень</h1>
    <div class="h-32 mx-auto">
      <div class="max-h-2 h-2 overflow-hidden">
        <TransitionNumber :delay="500">
          <h2 :key="displayLevel" class="fixed text-[96px] font-extrabold text-accent -translate-x-1/2">{{
              displayLevel
            }}</h2>
        </TransitionNumber>
      </div>
    </div>
    <span
        class="text-accent hover:text-accent-tinted transition duration-300 mx-auto font-bold text-[24px] lg:text-[32px] cursor-pointer"
        @click="$emit('next')">Далее</span>
  </div>
</template>

<style scoped>

</style>