<script lang="ts" setup>

import type {ExerciseGroup, ExerciseType} from "~/types/exercise.type";
import {dispatchErrorNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";
import {useSessionLocalStore} from "~/stores/session.local.store";
import {completeExerciseFrom} from "~/scripts/workout.utils";

const props = defineProps<{
  group: ExerciseGroup,
  exercises: ExerciseType[]
}>()

const router = useRouter()

const filteredExercises = computed(() => {
  return props.exercises.filter(exercise => exercise.assignedGroups.findIndex(g => g === props.group.id) !== -1)
})

const emits = defineEmits(['edit'])

const modalItem = ref<ExerciseType>()

const startTrainingModalState = ref<boolean>(false)

const addToExerciseModalState = ref<boolean>(false)

const modalAddAction = () => {
  startTrainingModalState.value = false
  addToExerciseModalState.value = true
}

const modalStartAction = () => {
  startTrainingModalState.value = false;
  if (!modalItem.value) {
    dispatchErrorNotification("Старт тренировки", "Не удалось начать тренировку")
    return;
  }
  const session = useSessionLocalStore.openNewSessionFromExercise(modalItem.value)
  dispatchSuccessNotification("Старт тренировки", "Произвольная тренировка начата")
  router.push(`/workout/session/${session.id}`)
}

</script>

<template>
  <div v-if="filteredExercises.length > 0" class="flex flex-col">
    <ExercisesModalAddToWorkout v-model:active="addToExerciseModalState" v-model:item="modalItem">
      {{ modalItem!.name }}
    </ExercisesModalAddToWorkout>
    <Modal v-model:active="startTrainingModalState">
      <div class="flex flex-col gap-2">
        <h1 class="text-[24px] lg:text-[32px]">Использование упражнения '<b>{{ modalItem!.name }}</b>'</h1>
        <span class="text-subtitle text-[20px] lg:text-[24px]">Выберете действие, которое хотите выполнить</span>
        <Button @click="modalAddAction"> Добавить в тренировку</Button>
        <Button @click="modalStartAction"> Начать произвольную тренировку</Button>
      </div>
    </Modal>
    <h1 :id="group.id" class="text-[24px] font-medium">{{ group.name }}</h1>
    <ExercisesCard v-for="exercise in filteredExercises" :editable="true" :exercise="completeExerciseFrom(exercise)"
                   @action="modalItem=exercise; startTrainingModalState=true"
                   @edit="$emit('edit', exercise)"></ExercisesCard>
  </div>
</template>

<style scoped>

</style>