<script lang="ts" setup>

import {ArrowTopRightOnSquareIcon} from "@heroicons/vue/24/outline";

const active = defineModel<boolean>('active', {default: false})

const emits = defineEmits(['add'])

const {getAllItems} = useExerciseStore()

const exercises = getAllItems()

</script>

<template>

  <Modal v-model:active="active">
    <div class="flex flex-col gap-4">
      <h1 class="text-[32px] font-bold">Выберите упражнение</h1>
      <LazyNuxtLink to="/exercise/list">
        <Button class="w-full"><span class="flex justify-center gap-2">Выбрать в каталоге упражнений <ArrowTopRightOnSquareIcon
            class="size-5 my-auto"></ArrowTopRightOnSquareIcon> </span></Button>
      </LazyNuxtLink>
      <h2 class="text-[24px] font-medium">Список упражнений</h2>
      <div class="rounded-3xl overflow-y-scroll overflow-x-auto flex flex-col w-full bg-secondary p-2 max-h-[50vh]">
        <ExercisesRadio v-for="exercise in exercises"
                        :exercise="exercise" class="hover:bg-primary/50 transition-colors duration-200 rounded-2xl p-4"
                        @choose="$emit('add', exercise)"></ExercisesRadio>
      </div>
      <span class="text-[24px] text-subtitle w-full text-center mt-4 cursor-pointer" @click="active=false">Закрыть</span>
    </div>
  </Modal>

</template>

<style scoped>

</style>