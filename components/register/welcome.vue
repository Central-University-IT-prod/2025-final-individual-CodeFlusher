<script lang="ts" setup>

import type {Profile} from "~/types/profile.type";
import {ArrowRightIcon} from "@heroicons/vue/24/outline";

const profile = defineModel<Profile>('profile', {default: {}})

const emits = defineEmits(['next'])

</script>

<template>

  <main class="flex flex-col gap-4 w-full mx-auto">
    <p class="text-[24px] lg:text-[32px] text-center">Добро пожаловать в Fit4You - персональный менеджер упржанений и
      тренировок</p>
    <span class="text-accent-dark hover:text-accent text-[32px] flex gap-2 mx-auto cursor-pointer"
          style="transition: color 200ms" @click="$emit('next')"> Далее <ArrowRightIcon
        class="size-5 my-auto"></ArrowRightIcon> </span>
  </main>

</template>

<style scoped>

</style>