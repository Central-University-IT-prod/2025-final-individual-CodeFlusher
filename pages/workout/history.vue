<script lang="ts" setup>
import type {WorkoutSession} from "~/types/session.type";
import type {Workout, WorkoutRegistryItem} from "~/types/workout.type";
import {computeWorkoutDifficulty, mapWorkoutToWorkoutRegistry} from "~/scripts/workout.utils";
import {useHistoryStorage} from "~/stores/history.local.storage";

useHead({
  title: 'История тренировок'
})

const mapSessions = (sessions: WorkoutSession[]) => {
  let workouts: WorkoutRegistryItem[] = []
  sessions.forEach(session => {
    const mappedWorkout = mapWorkoutToWorkoutRegistry(session.workout)
    mappedWorkout.id = session.id
    mappedWorkout.name = `Сессия упражнений от ${new Date(session.startTime).toLocaleString()}`
    mappedWorkout._special_field_points = computeWorkoutDifficulty(session.workout)
    workouts.push(mappedWorkout);
  })
  return workouts;
}

const activeSessionsMapped = computed(() => {
  return mapSessions(useSessionLocalStore.sessions.value).reverse();
})

const trainingHistoryMapped = computed(() => {
  return mapSessions(useHistoryStorage.history.value).reverse()
})

const modalItem = ref<WorkoutRegistryItem>()

const terminateModalState = ref<boolean>(false)
const deleteModalState = ref<boolean>(false)
const startModalState = ref<boolean>(false)
const editModalState = ref<boolean>(false)
const saveModalState = ref<boolean>(false)

const showTerminateModal = (workout: WorkoutRegistryItem) => {
  modalItem.value = workout
  terminateModalState.value = true
}

const showEditModal = (workout: WorkoutRegistryItem) => {
  modalItem.value = workout
  editModalState.value = true
}

const saveModalItem = ref<Workout>()

const showSaveModal = () => {
  if (!modalItem.value) {
    return
  }

  const foundItem = useHistoryStorage.history.value.find(item => {
    if (!modalItem.value) {
      return false;
    }
    return item.id === modalItem.value.id;
  })
  if (!foundItem) {
    return;
  }
  saveModalItem.value = foundItem.workout;
  editModalState.value = false;
  saveModalState.value = true
}

const router = useRouter()

const showStartModal = (workout: WorkoutRegistryItem) => {
  modalItem.value = workout
  startModalState.value = true
}

const modalStartAction = () => {
  if (!modalItem.value) {
    return;
  }
  const workout = JSON.parse(JSON.stringify(modalItem.value)) as WorkoutRegistryItem
  workout.name = `Тренировка от ${new Date().toLocaleString()}`
  for (let i = 0; i < workout.blocks.length; i++) {
    for (let j = 0; j < workout.blocks[i].elements.length; j++) {
      workout.blocks[i].elements[j].done = false;
    }
  }
  const session = useSessionLocalStore.openNewSession(workout);
  router.push(`/workout/session/${session.id}`);
}

const modalTerminateAction = () => {
  if (!modalItem.value) {
    return;
  }
  useSessionLocalStore.declineSessionById(modalItem.value.id)
  terminateModalState.value = false
}

const modalDeleteAction = () => {
  if (!modalItem.value) {
    return;
  }
  useHistoryStorage.removeSessionById(modalItem.value.id)
  deleteModalState.value = false;
}

</script>

<template>

  <main class="mx-auto p-4 lg:pt-6 flex flex-col gap-2">
    <LazyEditSure v-model:active="deleteModalState" @delete="modalDeleteAction">{{ modalItem!.name }}</LazyEditSure>
    <LazyEditSure v-model:active="terminateModalState" @delete="modalTerminateAction">{{ modalItem!.name }}</LazyEditSure>
    <LazyWorkoutModalStart v-model:active="startModalState" @start="modalStartAction">{{ modalItem!.name }}
    </LazyWorkoutModalStart>
    <LazyWorkoutModalSave v-model:active="saveModalState" v-model:workout="saveModalItem"></LazyWorkoutModalSave>
    <h1 class="text-[32px] font-bold">История тренировок</h1>
    <section v-if="activeSessionsMapped.length > 0" class="flex flex-col gap-2">
      <h1 class="text-[24px] font-bold">
        Активные тренировки {{ activeSessionsMapped.length }}шт.
      </h1>
      <WorkoutCard v-for="item in activeSessionsMapped" :points="item._special_field_points!" :workout="item"
                   @edit="showTerminateModal(item)" @start="router.push(`/workout/session/${item.id}`)"></WorkoutCard>
    </section>
    <section v-if="trainingHistoryMapped.length > 0" class="flex flex-col gap-2">
      <LazyModal v-model:active="editModalState">
        <h1 class="text-[24px] lg:text-[32px]">
          Изменение сессии упражнений '<b>{{ modalItem!.name }}</b>'
        </h1>
        <Button class="mt-2" destructive @click="editModalState=false; deleteModalState=true">Удалить из истории
        </Button>
        <Button class="mt-2" @click="showSaveModal"> Сохранить в каталог тренировок</Button>
        <span class="text-[20px] lg:text-[24px] text-subtitle text-center mt-2 cursor-pointer"
              @click="editModalState=false">Отмена</span>
      </LazyModal>
      <h1 class="text-[24px] font-bold">
        Завершенные тренировки {{ trainingHistoryMapped.length }}шт.
      </h1>
      <WorkoutCard v-for="item in trainingHistoryMapped" :points="item._special_field_points!" :workout="item"
                   @edit="showEditModal(item)" @start="showStartModal(item)"></WorkoutCard>
    </section>
    <section>
      <h1 class="text-subtitle text-[24px]" v-if="trainingHistoryMapped.length == 0">Здесь ничего нет! Выполните хотя бы одну тренировку что бы она появилась
        здесь</h1>
    </section>
  </main>

</template>

<style scoped>

</style>