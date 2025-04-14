<script lang="ts" setup>

import {getStringByDifficulty, getStyleByDifficulty} from "~/scripts/utils";
import {PencilSquareIcon} from "@heroicons/vue/24/outline";
import type {Exercise} from "~/types/workout.type";

const emits = defineEmits(['action', 'edit'])

const props = defineProps<{
  exercise: Exercise
  editable: Boolean,
}>()

const descriptionModalState = ref<boolean>(false)

const isHovered = ref<boolean>(false);

</script>

<template>
  <ExercisesDescription v-model:active="descriptionModalState" :exercise="exercise"></ExercisesDescription>

  <CardSecondary class="p-8 mt-4 flex flex-col gap-2">

    <div class="flex max-lg:flex-col gap-2">
      <h1 class="text-[24px] font-semibold"> {{ exercise.name }}</h1>
      <h2 :class="`${getStyleByDifficulty(exercise.difficulty)}`" class="text-[20px] my-auto lg:ml-auto">
        {{ getStringByDifficulty(exercise.difficulty) }}</h2>
    </div>
    <div v-if="exercise.muscleGroups.length > 0" class="">
      <h3 class="text-[16px]"> Группы мышц </h3>
      <div>
        <InventoryMiniCard v-for="item in exercise.muscleGroups" :emoji="item.emoji"
                           :text="item.name"></InventoryMiniCard>
      </div>
    </div>
    <div v-if="exercise.muscleGroups.length > 0" class="">
      <h3 class="text-[16px]"> Инвентарь </h3>
      <div>
        <InventoryMiniCard v-for="item in exercise.inventory" :emoji="item.emoji" :text="item.name"></InventoryMiniCard>
      </div>
    </div>

    <div class="flex max-lg:flex-col gap-2 justify-between w-full mt-4">
      <span class="text-[20px] text-subtitle my-auto cursor-help" @click="descriptionModalState = true"
            @mouseenter="isHovered=true" @mouseleave="isHovered=false"> Подробнее </span>
      <TransitionContext class="-translate-y-full">
        <div
            v-if="isHovered && exercise.description.length > 0"
            class="bg-primary text-[20px] p-4 absolute rounded-2xl border border-color shadow-lg shadow-accent/10 px-8 max-w-[50%]">
          <h1 class="break-all">
            {{ exercise.description }}
          </h1>
        </div>
      </TransitionContext>
      <span v-if="editable" class="text-[20px] text-subtitle my-auto cursor-pointer flex gap-2" @click="$emit('edit')"> Редактировать
        <PencilSquareIcon class="h-6 aspect-square my-auto"></PencilSquareIcon>
      </span>
    </div>
    <Button class="text-[20px] cursor-pointer transition duration-300 mt-2" @click="$emit('action')"> Использовать
    </Button>

  </CardSecondary>
</template>

<style scoped>

</style>