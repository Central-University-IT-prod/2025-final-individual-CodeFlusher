<template>
  <PageFilter v-model:filter="filter" filter-title="Фильтр тренировок" title="Список упражнений">
    <main class="flex lg:p-12 gap-6 flex-col">
      <div class="flex max-lg:flex-col lg:justify-between w-full gap-4">
        <h1 class="font-bold text-[32px] leading-none mb-auto">Тренировки</h1>

        <NuxtLink to="/workout/new">
          <Button class="max-lg:w-full">Создать новую</Button>
        </NuxtLink>
      </div>
      <h2 v-if="workouts.length === 0" class="font-bold text-[24px] text-subtitle">Список пуст :(</h2>
      <div class="flex flex-col gap-4">
        <LazyWorkoutCategory v-for="category in categories" :category="category" :workouts="workouts"/>
      </div>
    </main>
  </PageFilter>
</template>

<script lang="ts" setup>

import type {ExerciseFilter} from "~/types/exercise.type";
import type {WorkoutRegistryItem} from "~/types/workout.type";
import {filterWorkoutsBy} from "~/scripts/workout.filter";

const {getAllWorkouts} = useWorkoutRegistry()
const {getAllWorkoutGroups} = useWorkoutGroupRegistry()

const categories = computed(() => getAllWorkoutGroups())

const filter = ref<ExerciseFilter>()

const workouts = computed(() => {
  if (!filter.value) {
    return getAllWorkouts()
  }
  return filterWorkoutsBy(getAllWorkouts(), filter.value) as WorkoutRegistryItem[]
})

const filterDiv = ref<HTMLDivElement>()

</script>
