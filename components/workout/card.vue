<script lang="ts" setup>

import type {WorkoutRegistryItem} from "~/types/workout.type";
import type {ExerciseType, InventoryItem, MuscleGroups} from "~/types/exercise.type";

import {FireIcon, PencilSquareIcon, RectangleStackIcon} from "@heroicons/vue/24/outline";

const {getExerciseById} = useExerciseStore()

const {getInventoryItemById} = useInventoryRegistry()

const emits = defineEmits(['edit', 'start'])

const props = defineProps<{
  workout: WorkoutRegistryItem,
  points: number
}>()

const workoutGroups = computed(() => {
  let groups: ExerciseType[] = []
  props.workout.blocks.forEach(block => {
    const value = getExerciseById(block.exerciseId)
    if (value) {
      groups.push(value);
    }
  })

  return groups;
})

const inventory = computed(() => {
  const set = new Set<InventoryItem>();

  workoutGroups.value.forEach(group => {
    group.inventory.forEach(inventory => {
      const value = getInventoryItemById(inventory)
      if (value) {
        set.add(value)
      }
    })
  })

  return Array.from(set)
})

const muscles = computed(() => {
  const set = new Set<MuscleGroups>();

  workoutGroups.value.forEach(group => {
    group.muscleGroups.forEach(el => {
      const value = getMuscleGroupById(el)
      if (value) {
        set.add(value)
      }
    })
  })

  return Array.from(set)
})

const getWordByCount = computed(() => {
  return (count: number) => {
    if (count === 1) {
      return 'упражнение'
    }
    if (count < 5) {
      return 'упражнения'
    }
    return 'упражнений'
  }
})

</script>

<template>

  <CardSecondary class="p-6 flex flex-col gap-2">

    <h1 class="font-bold text-[24px]">
      {{ workout.name }}
    </h1>

    <p class="text-subtitle text-[20px]">{{ workout.description }}</p>

    <div class="flex gap-2 text-subtitle">
      <FireIcon class="size-6"></FireIcon>
      <h1> {{ points }} </h1>
      <RectangleStackIcon class="size-6"></RectangleStackIcon>
      <h1> {{ workout.blocks.length }} {{ getWordByCount(workout.blocks.length) }}</h1>
    </div>

    <div v-if="muscles.length > 0" class="">
      <h3 class="text-[16px]"> Группы мышц </h3>
      <div>
        <InventoryMiniCard v-for="item in muscles" :emoji="item.emoji" :text="item.name"></InventoryMiniCard>
      </div>
    </div>
    <div v-if="inventory.length > 0" class="">
      <h3 class="text-[16px]"> Инвентарь </h3>
      <div>
        <InventoryMiniCard v-for="item in inventory" :emoji="item.emoji" :text="item.name"></InventoryMiniCard>
      </div>
    </div>

    <div class="text-subtitle flex gap-2 text-[20px] cursor-pointer" @click="$emit('edit')">
      <span @click="$emit('edit')">
        Редактировать
      </span>

      <PencilSquareIcon class="size-6 my-auto"></PencilSquareIcon>
    </div>

    <Button class="w-full" @click="$emit('start')">Запустить тренировку</Button>

  </CardSecondary>

</template>

<style scoped>

</style>