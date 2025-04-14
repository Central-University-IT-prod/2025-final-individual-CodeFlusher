<script setup lang="ts">

import type {WorkoutSession} from "~/types/session.type";
import {computeWorkoutDifficulty} from "~/scripts/workout.utils";
import {formatSeconds} from "../scripts/utils";

import {FireIcon, ClockIcon, RectangleStackIcon} from "@heroicons/vue/24/outline";

const averageExperience = computed(()=>{
  const workouts = useHistoryStorage.history.value;
  if(workouts.length === 0){
    return 0;
  }
  let sum = 0;
  workouts.forEach((workout: WorkoutSession) => {
    sum += computeWorkoutDifficulty(workout.workout)
  })
  return sum / workouts.length;
})

const averageTime = computed(()=>{
  const workouts = useHistoryStorage.history.value;
  if(workouts.length === 0){
    return 0;
  }
  let sum = 0;
  workouts.forEach((workout: WorkoutSession) => {
    sum += workout.countedTime;
  })
  return sum / workouts.length;
})

const sessions = computed(()=>{
  return useHistoryStorage.history.value.length
})

const {profile} = storeToRefs(useProfileStore())

</script>

<template>
  <main class="mx-auto flex flex-col gap-2 p-6 lg:p-12 max-md:w-full">
    <ButtonBack/>
    <h1 class="text-[32px] font-bold">Статистика</h1>
    <h2 class="text-[24px] font-medium">Ваши физические данные</h2>
    <section class="w-full">
      <InputField custom-id="height-input" disable-validation :max="300" type="number" v-model:value="profile.height">Рост</InputField>
      <InputField custom-id="weight-input" disable-validation :max="500" type="number" v-model:value="profile.weight">Вес</InputField>
    </section>

    <h2 class="text-[24px] font-medium">Данные по тренировкам</h2>
    <section class="w-full flex flex-col gap-2">
      <h3 class="text-[20px]">Среднее время исполнения: </h3>
      <div class="flex gap-2">
        <ClockIcon class="h-6 my-auto aspect-square"></ClockIcon>
        <span class="text-[20px]"> <b class="text-accent-tinted">{{formatSeconds(averageTime)}}</b></span>
      </div>
      <h3 class="text-[20px]">Средний полученный опыт:</h3>
      <div class="flex gap-2">
        <FireIcon class="h-6 my-auto aspect-square"></FireIcon>
        <span class="text-[20px]"> <b class="text-accent-tinted">{{averageExperience}}</b></span>
      </div>
      <h3 class="text-[20px]">Всего тренировок в истории:</h3>
      <div class="flex gap-2">
        <RectangleStackIcon class="h-6 my-auto aspect-square"></RectangleStackIcon>
        <span class="text-[20px]"> <b class="text-accent-tinted">{{sessions}}</b></span>
      </div>

    </section>
  </main>
</template>

<style scoped>

</style>