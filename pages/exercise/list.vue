<template>
  <PageFilter v-model:filter="filter" title="Список тренировок">
    <ExercisesList v-model:exercises="exercises" class="w-full"></ExercisesList>
  </PageFilter>
</template>

<script lang="ts" setup>

import {filterBy} from "~/scripts/exercise.filter";
import type {ExerciseFilter, ExerciseType} from "~/types/exercise.type";

const {getAllItems} = useExerciseStore()

const filter = ref<ExerciseFilter>()


const exercises = computed(() => {
  if (!filter.value) {
    return getAllItems()
  }
  return filterBy(getAllItems(), filter.value) as ExerciseType[]
})

</script>
