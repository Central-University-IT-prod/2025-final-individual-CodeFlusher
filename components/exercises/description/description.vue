<script lang="ts" setup>


import type {DefaultItem, Identifiable} from "~/types/exercise.type";

const descriptionModalState = defineModel<boolean>('active', {default: false})

const props = defineProps<{
  exercise: DefaultItem & Identifiable & {
    name: string
    descriptionLong: string[]
    url?: string
  }
}>()

</script>

<template>
  <Modal v-model:active="descriptionModalState">
    <h1 class="text-[32px] font-bold">{{ exercise.name }}</h1>
    <h2 class="text-[24px] font-bold mt-4">Инструкция к выполнению</h2>
    <p v-for="(item, index) in exercise.descriptionLong" class="text-[20px] text-subtitle"> {{ index + 1 }}.
      {{ item }} </p>
    <h2 v-if="exercise.url" class="text-[24px] font-bold mt-4">Видеоинструкция</h2>
    <IframeVideo v-if="exercise.url" :url="exercise.url"></IframeVideo>
    <h3 class="w-full text-accent-dark hover:text-accent transition duration-300 text-center text-[32px] mt-4 cursor-pointer"
        @click="descriptionModalState=false"> Понятно </h3>
  </Modal>
</template>

<style scoped>

</style>