<script lang="ts" setup>

import type {ExerciseType, Identifiable} from "~/types/exercise.type";
import {
  dispatchErrorNotification,
  dispatchInfoNotification,
  dispatchSuccessNotification
} from "~/scripts/notification.utils";
import {anyIdInDeepArray, stringArrayGenerator} from "~/scripts/utils";
import type {ExerciseBlockRegistry, WorkoutRegistryItem} from "~/types/workout.type";

const store = useExerciseGroupRegistry()

const groups = computed(() => {
  return store.getAllGroups()
})

const exercises = defineModel<ExerciseType[]>('exercises', {default: []})

const {registerNew, removeItem} = useExerciseStore()
const {getAllWorkouts} = useWorkoutRegistry()

const modalState = ref<boolean>(false);
const modalItem = ref<ExerciseType>();

const showModal = (exercise: ExerciseType) => {
  modalItem.value = exercise
  modalState.value = true
}

const router = useRouter()

const modalEditAction = () => {
  if (!modalItem.value) {
    return;
  }
  modalState.value = false;
  router.push(`/exercise/new?id=${modalItem.value.id}`)
}

const modalCopyAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Редактирование упражнения", "Неудалось скопировать упражнение")
    return;
  }
  const newExercise = JSON.parse(JSON.stringify(modalItem.value))
  newExercise.id = `custom-exercise-${crypto.randomUUID()}`;
  newExercise.isDefault = false;
  newExercise.name = newExercise.name + ' (Копия)'
  registerNew(newExercise)
  modalState.value = false;
  dispatchSuccessNotification('Редактирование упражнения', `Упражнение '${modalItem.value.name}' было успешно скопировано в '${newExercise.name}'`)
}

const deleteModalState = ref<boolean>(false);
const failedModalState = ref<boolean>(false);

const modalDeleteAction = () => {
  if (!modalItem.value) {
    return;
  }
  modalState.value = false;
  if (
      anyIdInDeepArray(getAllWorkouts(),
          (item: Identifiable) => {
            const value = stringArrayGenerator((item as WorkoutRegistryItem).blocks, (item1: object) => (item1 as ExerciseBlockRegistry).exerciseId)
            return value;
          },
          modalItem.value
      )) {
    failedModalState.value = true;
  } else {
    deleteModalState.value = true;
  }
}

const deleteItem = () => {
  if (!modalItem.value) {
    return;
  }
  removeItem(modalItem.value)
  deleteModalState.value = false
  dispatchInfoNotification('Удаление упражнения', `Упражнение '${modalItem.value.name}' было удалено`)
}

</script>

<template>

  <main class="flex lg:p-12 gap-6 flex-col">
    <LazyEditSure v-model:active="deleteModalState" @delete="deleteItem">{{ modalItem!.name }}</LazyEditSure>

    <LazyModal v-model:active="failedModalState">
      <h1 class="text-[32px] font-medium">Невозможно удалить "<b>{{ modalItem!.name }}</b>"</h1>
      <h2 class="text-subtitle text-[24px]">Существует тренировка, связанная с данным упражнением. Удалите или измените
        тренировку, а затем попробуйте снова</h2>
      <span class="m-auto cursor-pointer w-full text-center text-[24px]" @click="failedModalState=false">Понятно</span>
    </LazyModal>

    <LazyEditModal v-model:active="modalState" :modal-item="modalItem" @copy="modalCopyAction"
                   @delete="modalDeleteAction"
                   @edit="modalEditAction">{{ modalItem!.name }}
    </LazyEditModal>

    <div class="flex max-lg:flex-col lg:justify-between w-full gap-4">
      <h1 class="font-bold text-[32px] leading-none mb-auto">Упражнения</h1>

      <NuxtLink to="/exercise/new">
        <Button class="max-lg:w-full">Создать новое</Button>
      </NuxtLink>
    </div>
    <h2 v-if="exercises.length === 0" class="font-bold text-[24px] text-subtitle">Список пуст :(</h2>
    <div class="flex flex-col gap-4">
      <LazyExercisesCategory v-for="group in groups" :exercises="exercises" :group="group"
                             @edit="el => showModal(el)"></LazyExercisesCategory>
    </div>
  </main>

</template>

<style scoped>

</style>