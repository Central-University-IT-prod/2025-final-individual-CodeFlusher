<script lang="ts" setup>

import type {WorkoutGroup, WorkoutRegistryItem} from "~/types/workout.type";
import {dispatchInfoNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";
import {useSessionLocalStore} from "~/stores/session.local.store";
import {computeWorkoutRegistryDifficulty} from "~/scripts/workout.utils";

const props = defineProps<{
  workouts: WorkoutRegistryItem[],
  category: WorkoutGroup
}>()

const categoryWorkouts = computed(() => {
  return props.workouts.filter(workout => workout.workoutGroups.indexOf(props.category.id) !== -1)
})

const router = useRouter()

const {registerWorkout, removeWorkout} = useWorkoutRegistry()

const modalState = ref<boolean>(false)
const verifyModal = ref<boolean>(false)

const modalItem = ref<WorkoutRegistryItem>()

const modalCopyAction = () => {
  if (!modalItem.value) {
    return
  }
  const newItem = JSON.parse(JSON.stringify(modalItem.value))
  newItem.id = `custom-workout-id-${crypto.randomUUID()}`
  newItem.isDefault = false;
  newItem.name = newItem.name + ' (Копия)'
  registerWorkout(newItem)
  dispatchInfoNotification("Редактирование тренировки", `Тренировка '${modalItem.value.name}' была скопирована в тренировку '${newItem.name}'`)
  modalState.value = false;
}

const modalEditAction = () => {
  if (!modalItem.value) {
    return
  }
  modalState.value = false;
  router.push(`/workout/new?id=${modalItem.value.id}`)
}

const modalDeleteAction = () => {
  if (!modalItem.value) {
    return
  }
  verifyModal.value = false;
  removeWorkout(modalItem.value)
  dispatchSuccessNotification("Редактирование тренировок", `Тренировка '${modalItem.value.name}' была успешно удалена`)
}

const startModal = ref<boolean>(false)

const startAction = () => {
  if (!modalItem.value) {
    return
  }
  startModal.value = false
  dispatchInfoNotification("Тренировка", `Начата тренировка '${modalItem.value.name}'`)
  const session = useSessionLocalStore.openNewSession(modalItem.value)
  router.push(`/workout/session/${session.id}`)
}
const showModal = (item: WorkoutRegistryItem) => {
  modalItem.value = item
  modalState.value = true;
}

const showStartModal = (item: WorkoutRegistryItem) => {
  modalItem.value = item;
  startModal.value = true
}

</script>

<template>

  <div v-if="categoryWorkouts.length > 0" class="flex flex-col gap-2">

    <EditModal v-model:active="modalState" :modal-item="modalItem" @copy="modalCopyAction"
               @delete="verifyModal=true; modalState=false" @edit="modalEditAction">{{ modalItem!.name }}
    </EditModal>

    <EditSure v-model:active="verifyModal" @delete="modalDeleteAction">{{ modalItem!.name }}</EditSure>

    <WorkoutModalStart v-model:active="startModal" @start="startAction">{{ modalItem!.name }}</WorkoutModalStart>

    <h1 :id="category.id" class="text-[24px] font-medium">{{ category.name }}</h1>
    <LazyWorkoutCard v-for="item in categoryWorkouts" :points="computeWorkoutRegistryDifficulty(item)" :workout="item"
                     @edit="showModal(item)" @start="showStartModal(item)  "/>
  </div>

</template>

<style scoped>

</style>