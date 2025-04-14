<script lang="ts" setup>

import {TrainingGoals} from "~/types/profile.type";
import {evaluateBMI, getNameForGoal} from "~/scripts/profile.utils";

const {profile} = storeToRefs(useProfileStore())

const emits = defineEmits(['update', 'next'])

const handleSubmit = (event: Event): void => {
  event.preventDefault()
  emits('update', profile.value)
  emits('next')
}

const bmi = evaluateBMI()

const automaticGoal = computed(() => {
  if (bmi < 18) {
    return TrainingGoals.MUSCLE_GAIN;
  }
  if (bmi > 25) {
    return TrainingGoals.DROP_WEIGHT;
  }
  return TrainingGoals.KEEP_FIT;
})

</script>

<template>

  <form class="text-[24px] flex gap-2 flex-col mx-auto" @submit="handleSubmit">
    <h1 class="text-[32px] font-bold">Выберете цель тренировок</h1>
    <span>Рекомендованная цель: <b>{{ getNameForGoal(automaticGoal) }}</b> </span>
    <div class="flex w-fit gap-2">
      <CheckboxRadio :active="profile.trainingGoal === TrainingGoals.KEEP_FIT"></CheckboxRadio>
      <input id="training-target-choose-fit" v-model="profile.trainingGoal" :value="TrainingGoals.KEEP_FIT" class="ring-accent"
             name="training-target-choose" tabindex="1" type="radio" @input="$emit('update', profile);"/>
      <label class="text-subtitle" for="training-target-choose-fit">{{ getNameForGoal(TrainingGoals.KEEP_FIT) }}</label>
    </div>
    <div class="flex w-fit gap-2">
      <CheckboxRadio :active="profile.trainingGoal === TrainingGoals.MUSCLE_GAIN"></CheckboxRadio>
      <input id="training-target-choose-muscle" v-model="profile.trainingGoal" :value="TrainingGoals.MUSCLE_GAIN" name="training-target-choose"
             tabindex="2" type="radio" @input="$emit('update', profile);"/>
      <label class="text-subtitle"
             for="training-target-choose-muscle">{{ getNameForGoal(TrainingGoals.MUSCLE_GAIN) }}</label>
    </div>
    <div class="flex w-fit gap-2">
      <CheckboxRadio :active="profile.trainingGoal === TrainingGoals.DROP_WEIGHT"></CheckboxRadio>
      <input id="training-target-choose-weight" v-model="profile.trainingGoal" :value="TrainingGoals.DROP_WEIGHT" name="training-target-choose"
             tabindex="3" type="radio" @input="$emit('update', profile);"/>
      <label class="text-subtitle"
             for="training-target-choose-weight">{{ getNameForGoal(TrainingGoals.DROP_WEIGHT) }}</label>
    </div>
    <Button tabindex="4" :disabled="!profile.trainingGoal" type="submit">Продолжить</Button>
  </form>

</template>

<style scoped>

</style>