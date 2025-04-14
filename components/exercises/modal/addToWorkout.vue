<script lang="ts" setup>

import type {ExerciseType} from "~/types/exercise.type";
import {dispatchSuccessNotification} from "~/scripts/notification.utils";
import {completeExerciseFrom} from "~/scripts/workout.utils";

const {getExerciseById} = useExerciseStore()
const {registeredWorkouts, getWorkoutById, registerWorkout} = useWorkoutRegistry()

const active = defineModel<boolean>('active', {default: false})
const item = defineModel<ExerciseType>('item', {default: {}})

const chosenWorkoutId = ref<string>('')
const haveChosenSession =ref<boolean>(false)

const activeSessions = computed(()=>{
  return useSessionLocalStore.sessions.value;
})

const submit = (e: Event) => {
  e.preventDefault()
  if (!chosenWorkoutId.value) {
    return
  }

  if(haveChosenSession.value) {
    const session = useSessionLocalStore.sessions.value.find(session => session.id === chosenWorkoutId.value)
    if(session) {
      const exercise = getExerciseById(item.value.id)
      if(exercise) {
        session.workout.blocks.push({
          exercise: completeExerciseFrom(exercise),
          elements: []
        })
        dispatchSuccessNotification("Изменение тренировки", `Упражнение '${item.value.name}' было успешно добавлено в тренировку '${session.workout.name}'`)
      }
    }
  }else{
    const workout = getWorkoutById(chosenWorkoutId.value)
    if (workout) {
      workout.blocks.push({
        exerciseId: item.value.id,
        elements: []
      })
      registerWorkout(workout)
      dispatchSuccessNotification("Изменение тренировки", `Упражнение '${item.value.name}' было успешно добавлено в тренировку '${workout.name}'`)

    }
  }

  active.value = false
}

</script>

<template>

  <Modal v-model:active="active">
    <form class="flex flex-col gap-2" @submit="submit">
      <h1 class="text-[24px] lg:text-[32px] ">Добавить упражнение '<b>{{ item.name }}</b>' в тренировку</h1>

      <h1 class="text-[24px]">Активные тренировки</h1>

      <div class="flex flex-col gap-2 max-h-[30vh] overflow-y-scroll overflow-x-hidden">
        <div v-for="item in activeSessions" class="flex flex-col gap-2 cursor-pointer p-4 rounded-3xl bg-secondary"
             @click="chosenWorkoutId=`${item.id}`; haveChosenSession=true">
          <div class="gap-2 flex">
            <CheckboxRadio :active="chosenWorkoutId === item.id"></CheckboxRadio>
            <input :id="`radio-${item.id}`" v-model="chosenWorkoutId" :value="item.id" name="radio-input-choose-workout"
                   type="radio">
            <label :for="`radio-${item.id}`" class="text-[24px] font-medium">{{ item.workout.name }}</label>
          </div>
        </div>
        <span v-if="activeSessions.length === 0" class="text-subtitle"> Не существует ни одной активной тренировки, в которую можно добавить упражнение</span>
      </div>

      <h1 class="text-[24px] mt-4">Сохраненный тренировки</h1>

      <div class="flex flex-col gap-2 max-h-[30vh] overflow-y-scroll overflow-x-hidden">
        <div v-for="item in registeredWorkouts" class="flex flex-col gap-2 cursor-pointer p-4 bg-secondary rounded-3xl"
             @click="chosenWorkoutId=`${item.id}`; haveChosenSession=false">
          <div class="gap-2 flex">
            <CheckboxRadio :active="chosenWorkoutId === item.id"></CheckboxRadio>

            <input :id="`radio-${item.id}`" v-model="chosenWorkoutId" :value="item.id" name="radio-input-choose-workout"
                   type="radio">
            <label :for="`radio-${item.id}`" class="text-[24px] font-medium">{{ item.name }}</label>
          </div>
          <span class="text-[20px] lg:text-[24px] text-subtitle">{{ item.description }}</span>
        </div>
        <span v-if="registeredWorkouts.length === 0" class="text-subtitle"> Не существует ни одной тренировки, в которую можно добавить упражнение. В стандартные тренировки добавлять упражнения нельзя</span>
      </div>
      <Button :disabled="!chosenWorkoutId" class="w-full" type="submit">Добавить в тренировку</Button>
      <span class="text-[20px] text-subtitle w-full text-center mt-2 cursor-pointer"
            @click="active=false">Закрыть</span>
    </form>

  </Modal>

</template>

<style scoped>

</style>