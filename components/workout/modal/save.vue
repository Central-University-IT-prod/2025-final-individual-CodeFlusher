<script lang="ts" setup>

import type {Exercise, ExerciseBlock, Workout, WorkoutGroup} from "~/types/workout.type";
import type {ExerciseGroup, InventoryItem} from "~/types/exercise.type";
import {stringArrayGenerator} from "~/scripts/utils";
import {dispatchInfoNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";
import {mapToExerciseType, mapWorkoutToWorkoutRegistry} from "~/scripts/workout.utils";

const workout = defineModel<Workout>('workout', {default: {}})
const active = defineModel<boolean>('active', {default: false})

const {registerWorkout} = useWorkoutRegistry()

const submitAction = (event: Event) => {
  event.preventDefault()
  if (!workout.value) {
    return;
  }
  const mapped = mapWorkoutToWorkoutRegistry(workout.value);
  mapped.workoutGroups.push('restored')
  registerWorkout(mapped)
  dispatchSuccessNotification("Сохранение тренировки", "Успешно сохранена тренировка")
  active.value = false;
}

const {getExerciseById, registerNew} = useExerciseStore()
const {getInventoryItemById, register} = useInventoryRegistry()
const {getById, registerGroup} = useExerciseGroupRegistry()
const {getWorkoutGroupById, registerWorkoutGroup} = useWorkoutGroupRegistry()

const unsavedExercises = computed(() => {
  let list: Exercise[] = []
  workout.value.blocks.forEach((block: ExerciseBlock) => {
    if (!getExerciseById(block.exercise.id)) {
      list.push(block.exercise)
    }
  })
  return list
})

const unsavedExerciseGroups = computed(() => {
  let list: ExerciseGroup[] = []
  unsavedExercises.value.forEach((exercise: Exercise) => {
    exercise.assignedGroups.forEach((assignedGroup: ExerciseGroup) => {
      if (!getById(assignedGroup.id)) {
        list.push(assignedGroup)
      }
    })
  })
  return list;
})

const unsavedInventory = computed(() => {
  let list: InventoryItem[] = []
  unsavedExercises.value.forEach((exercise: Exercise) => {
    exercise.inventory.forEach((item: InventoryItem) => {
      if (!getInventoryItemById(item.id)) {
        list.push(item)
      }
    })
  })
  return list;
})

const unsavedWorkoutGroups = computed(() => {
  let list: WorkoutGroup[] = []
  workout.value.workoutGroups.forEach((group: WorkoutGroup) => {
    if (!getWorkoutGroupById(group.id)) {
      list.push(group)
    }
  })
  return list;
})

const saveExercise = (exercise: Exercise) => {
  let tag = false;
  exercise.inventory.forEach((item: InventoryItem) => {
    if (stringArrayGenerator(unsavedInventory.value, (o: object) => (o as InventoryItem).id).indexOf(item.id) !== -1) {
      tag = true;
    }
  })
  if (tag) {
    dispatchInfoNotification("Сохранение тренировки", "Невозможно сохранить упражнение, не сохранив инвентарь, связанный с ним")
    return
  }
  exercise.assignedGroups.forEach((item: ExerciseGroup) => {
    if (stringArrayGenerator(unsavedExerciseGroups.value, (o: object) => (o as ExerciseGroup).id).indexOf(item.id) !== -1) {
      tag = true;
    }
  })
  if (tag) {
    dispatchInfoNotification("Сохранение тренировки", "Невозможно сохранить упражнение, не сохранив группу тренировок, связанную с ним")
    return
  }
  registerNew(mapToExerciseType(exercise))
}

</script>

<template>

  <Modal v-model:active="active">
    <form class="flex flex-col gap-2" @submit="submitAction">
      <h1 class="text-[24px] lg:text-[32px] font-bold">Сохранение в список тренировок</h1>
      <section v-if="unsavedInventory.length > 0">
        <h1>Не сохраненные предметы инвентаря</h1>
        <InventoryCard v-for="item in unsavedInventory" :emoji="item.emoji" :show-linked-items="false" :title="item.name"
                       disable-edit><span
            class="text-accent-dark hover:text-accent-tinted transition duration-300 cursor-pointer"
            @click="register(item)">Сохранить</span></InventoryCard>
      </section>
      <section v-if="unsavedExerciseGroups.length > 0">
        <h1>Не сохраненные группы упражнений</h1>
        <InventoryCard v-for="item in unsavedExerciseGroups" :show-linked-items="false" :title="item.name" disable-edit>
          <span class="text-accent-dark hover:text-accent-tinted transition duration-300 cursor-pointer"
                @click="registerGroup(item)">Сохранить</span></InventoryCard>
      </section>
      <section v-if="unsavedExercises.length > 0">
        <h1>Не сохраненные упражнения</h1>
        <ExercisesCard v-for="item in unsavedExercises" :editable="false" :exercise="item"
                       @action="saveExercise(item)"></ExercisesCard>
      </section>
      <section v-if="unsavedWorkoutGroups.length > 0">
        <h1>Не сохраненные группы тренировок</h1>
        <InventoryCard v-for="item in unsavedWorkoutGroups" :show-linked-items="false" :title="item.name" disable-edit>
          <span class="text-accent-dark hover:text-accent-tinted transition duration-300 cursor-pointer"
                @click="registerWorkoutGroup(item)">Сохранить</span></InventoryCard>
      </section>
      <section class="flex flex-col gap-2">
        <span v-if="unsavedExercises.length > 0 || unsavedWorkoutGroups.length > 0 || unsavedExerciseGroups.length > 0 || unsavedInventory.length > 0"
              class="text-subtitle text-[20px] lg:text-[24px]"> Сохранить можно если сохранены все связаные упражения</span>
        <span v-else class="text-subtitle text-[20px] lg:text-[24px]"> Сохранение доступно</span>
        <Button :disabled="unsavedExercises.length > 0 || unsavedWorkoutGroups.length > 0 || unsavedExerciseGroups.length > 0 || unsavedInventory.length > 0" class="w-full"
                type="submit">
          Сохранить тренировку
        </Button>
      </section>
    </form>

  </Modal>

</template>

<style scoped>

</style>