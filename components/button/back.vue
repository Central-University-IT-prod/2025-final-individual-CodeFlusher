<script lang="ts" setup>
import {ArrowLeftIcon} from "@heroicons/vue/24/outline";

const router = useRouter()
</script>

<template>

  <div
      class="flex gap-2 cursor-pointer text-subtitle text-subtitle-hover transition-colors duration-300"
      @click="router.back()"
  >
    <ArrowLeftIcon class="size-5 my-auto"></ArrowLeftIcon>
    <span class="text-[20px]">Назад</span>
  </div>

</template>

<style scoped>

</style>