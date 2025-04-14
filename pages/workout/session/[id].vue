<script lang="ts" setup>

import type {ExerciseType} from "~/types/exercise.type";
import {computeWorkoutDifficulty, mapBlock} from "~/scripts/workout.utils";
import type {WorkoutSession} from "~/types/session.type";
import type {ExerciseBlock} from "~/types/workout.type";
import {useSessionLocalStore} from "~/stores/session.local.store";
import {ClockIcon, FireIcon} from "@heroicons/vue/24/outline";
import {formatSeconds} from "../../../scripts/utils";
import {getLevel} from "~/scripts/profile.utils";

const route = useRoute()
const router = useRouter()
const routeId = route.params.id as string

const val = useSessionLocalStore.getSessionById(routeId)

if (!val) {
  router.push('/workout/list')
}

const {addExperience} = useProfileStore()

const session = ref<WorkoutSession>(val!)

const update = () => {
  if (session.value && !session.value.isFinished) {
    useSessionLocalStore.updateSession(session.value)
  }
}

const activeChooseModal = ref<boolean>(false)

const addNewExercise = () => {
  activeChooseModal.value = true
}

const addExerciseAction = (exercise: ExerciseType) => {
  activeChooseModal.value = false
  const generatedVal = mapBlock({
    exerciseId: exercise.id,
    elements: [],
  })
  if (generatedVal) {
    session.value.workout.blocks.push(generatedVal)
  }
  update()
}

const removeExercise = (index: number) => {
  let newBlocks: ExerciseBlock[] = []
  for (let i = 0; i < session.value.workout.blocks.length; i++) {
    if (i !== index) {
      newBlocks.push(session.value.workout.blocks[i])
    }
  }
  session.value.workout.blocks = newBlocks;
  update()
}

const restTimer = ref<number>(0)
const timerModalState = ref<boolean>(false)

watch(restTimer, () => {
  if (restTimer.value === 0) {
    timerModalState.value = false
  }
})

const handleChange = (newState: boolean) => {
  if (newState) {
    restTimer.value = 90;
    timerModalState.value = true
  }
}

const interval = ref<any>(null)

onMounted(() => {
  interval.value = setInterval(() => {
    if (session.value && !session.value.isFinished) {
      session.value.countedTime++;
      update()
    }
    if (restTimer.value > 0) {
      restTimer.value--;
    }
  }, 1000)

})

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})

const finishModalState = ref<boolean>(false)

const handleFinish = () => {
  if (!session.value) {
    return
  }
  finishModalState.value = true;
}

const gainedExp = ref<number>(0)

const finishedModalState = ref<boolean>(false)
const prevLevel = ref<number>(0)
const newLevel = ref<number>(0)

const finishSessionAction = () => {
  gainedExp.value = computeWorkoutDifficulty(session.value.workout)
  prevLevel.value = getLevel.value
  addExperience(gainedExp.value)
  session.value = useSessionLocalStore.closeSession(session.value);
  newLevel.value = getLevel.value
  finishedModalState.value = true
  finishModalState.value = false
}

const useTimerPopup = ref<boolean>(true)

useHead({
  title: `Тренировка '${session.value.workout.name}' - ${formatSeconds(session.value.countedTime)}`
})

</script>


<template>
  <main class="lg:grid lg:grid-cols-2 max-lg:flex max-lg:flex-col lg:p-12 mx-auto gap-12">
    <LazyTrainingFinish v-model:active="finishedModalState" :current-level="newLevel" :exp-gained="gainedExp"
                    :previous-level="prevLevel" :time="session.countedTime"></LazyTrainingFinish>
    <section
        class="flex flex-col gap-4"
    >
      <LazyModal v-model:active="finishModalState">
        <h1 class="text-[24px] lg:text-[32px] font-bold">
          Вы уверены что хотите завершить тренировку?
        </h1>
        <span class="text[20px] lg:text-[24px] text-subtitle mt-2">
          Тренировка останется в истории
        </span>
        <Button class="mt-2 w-full" @click="finishSessionAction">Завершить</Button>
      </LazyModal>
      <h1 class="text-[24px] lg:text-[32px] font-bold">{{ session.workout.name }}</h1>
      <CardSecondary class="p-6">
        <div class="flex gap-2 text-subtitle text-[20px]">
          <ClockIcon class="size-6 my-auto"></ClockIcon>
          <span>{{ formatSeconds(session.countedTime) }}</span>
          <FireIcon class="size-6 my-auto"></FireIcon>
          <span>{{ computeWorkoutDifficulty(session.workout) }}</span>
        </div>
      </CardSecondary>
      <CheckboxToggle v-model:state="useTimerPopup">Таймер поверх окон</CheckboxToggle>
      <CardSecondary class="p-6">
        <Timer v-model:time="restTimer"></Timer>
      </CardSecondary>
      <Button @click="handleFinish">Закончить</Button>
    </section>
    <section class="flex flex-col gap-2">
      <LazyModal v-if="useTimerPopup" v-model:active="timerModalState">
        <Timer v-model:time="restTimer"></Timer>
        <span class="text-center text-subtitle text-[20px] lg:text-[24px] cursor-pointer mt-4" @click="timerModalState=false">Закрыть</span>
      </LazyModal>
      <LazyExercisesModalChoose v-model:active="activeChooseModal" @add="addExerciseAction"></LazyExercisesModalChoose>
      <h2 class="text-[20px] lg:text-[32px] font-medium">Упражнения</h2>
      <WorkoutExerciseCard v-for="(item, index) in session.workout.blocks" v-model:elements="item.elements"
                           v-model:exercise="item.exercise" checkable
                           removable @change="val => handleChange(val)"
                           @remove="removeExercise(index)" @update="update"></WorkoutExerciseCard>
      <Button @click="addNewExercise">Добавить новое упражнение</Button>
    </section>

  </main>
</template>

<style scoped>

</style>