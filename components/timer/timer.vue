<script lang="ts" setup>

import {ClockIcon} from "@heroicons/vue/24/outline";
import {clamp, formatSeconds} from "~/scripts/utils";

const time = defineModel<number>('time', {default: 0})

const decrement = () => {
  time.value = clamp(time.value - 10, 0);
}

const increment = () => {
  time.value += 10;
}

</script>

<template>
  <section class="flex flex-col gap-2">
    <h1 class="mx-auto text-[24px] font-medium">Таймер отдыха <span
        class="ml-2 text-subtitle">{{ formatSeconds(time) }}</span></h1>
    <ClockIcon class="mx-auto w-32 aspect-square"></ClockIcon>
    <span class="text-[20px] text-subtitle ">Таймер отдыха - важная часть любой тренировки. Он подсказывает оптимальное время отдыха между подходами</span>
    <div class="grid max-lg:grid-cols-1 lg:grid-cols-2 w-full gap-2">
      <Button destructive @click="decrement">
        Уменьшить на 10с.
      </Button>

      <Button @click="increment">
        Увеличить на 10с.
      </Button>
    </div>

  </section>
</template>

<style scoped>

</style>