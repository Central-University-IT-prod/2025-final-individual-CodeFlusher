<script lang="ts" setup>

import {formatSeconds} from "~/scripts/utils";

const emits = defineEmits(['next'])

const overallTime = defineProps({
  time: {
    type: Number,
    default: 0
  }
})

</script>

<template>

  <div class="flex flex-col m-auto">
    <h1 class="text-[32px] lg:text-[48px] font-bold mx-auto text-white">Тренировка завершена!</h1>
    <p class="text-[24px] lg:text-[32px] w-full text-center text-white">
      Поздравляем с успешным завершением тренировки!
    </p>

    <h2 class="w-full text-center text-[24px] lg:text-[32px] text-white">Тренировка длилась: <b>{{formatSeconds(time)}}</b></h2>
    <span
        class="text-accent hover:text-accent-tinted transition duration-300 mx-auto font-bold text-[24px] lg:text-[32px] cursor-pointer"
        @click="$emit('next')">Далее</span>
  </div>

</template>

<style scoped>

</style>