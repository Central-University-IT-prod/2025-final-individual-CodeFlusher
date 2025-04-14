<script lang="ts" setup>
import type {ExerciseBlock, ExerciseBlockRegistry, WorkoutRegistryItem} from "~/types/workout.type";
import {
  dispatchErrorNotification,
  dispatchInfoNotification,
  dispatchSuccessNotification
} from "~/scripts/notification.utils";
import type {ExerciseType} from "~/types/exercise.type";
import {completeExerciseFrom} from "~/scripts/workout.utils";

useHead({
  title: 'Создание тренировки'
})

const {registerWorkout, getWorkoutById} = useWorkoutRegistry()
const {getExerciseById} = useExerciseStore()

const workout = ref<WorkoutRegistryItem>({
  id: `custom-workout-${crypto.randomUUID()}`,
  name: '',
  description: '',
  workoutGroups: [],
  blocks: [],
  isDefault: false,
})

const exerciseBlocks = ref<ExerciseBlock[]>([]);

const route = useRoute()
const router = useRouter()
const workoutId = computed(() => route.query.id as string ?? '')

if (workoutId.value) {
  const value = getWorkoutById(workoutId.value)
  if (value) {
    workout.value = value
  } else {
    dispatchErrorNotification("Редактирование тренировки", "Невозможно отредактировать тренировку")
    router.back()
  }
}


const computeBlocks = () => {
  let blocks: ExerciseBlock[] = []
  workout.value.blocks.forEach((block: ExerciseBlockRegistry) => {

    const exerciseType = getExerciseById(block.exerciseId);

    if (!exerciseType) {
      dispatchErrorNotification("Редактирование упражнений", "Не удалось получить упражнение")
      router.back()
      return;
    }

    const exercise = completeExerciseFrom(exerciseType);

    if (!exercise) {
      dispatchErrorNotification("Редактирование упражнений", "Н еудалось получить упражнение")
      router.back()
      return;
    }

    const value: ExerciseBlock = {
      exercise: exercise,
      elements: block.elements
    }

    blocks.push(value)

  });
  exerciseBlocks.value = blocks;
}

computeBlocks()

const verify = ref<boolean>(false);

const remapData = () => {
  let newBlocks: ExerciseBlockRegistry[] = []
  exerciseBlocks.value.forEach((block: ExerciseBlock) => {
    newBlocks.push({
      exerciseId: block.exercise.id,
      elements: block.elements
    })
  })
  workout.value.blocks = newBlocks;
}

const pushWorkout = (event: Event) => {
  event.preventDefault()
  verify.value = true;
  if (!workout.value.name) {
    return;
  }
  if (!workout.value.description) {
    return;
  }
  if (workout.value.workoutGroups.length === 0) {
    return;
  }
  if (workout.value.blocks.length === 0) {
    return;
  }
  workout.value.name = workout.value.name.trim()
  remapData()
  let failedValidation = false;
  workout.value.blocks.forEach((block: ExerciseBlockRegistry) => {
    if (block.elements.length === 0) {
      failedValidation = true;
    }
  })
  if (failedValidation) {
    dispatchInfoNotification(workoutId.value ? "Редактирование тренировки" : "Создание тренировки", "В любом упражнении должно быть заполнено хотя бы одно поле с подходами")
    return;
  }
  registerWorkout(workout.value)
  dispatchSuccessNotification(workoutId.value ? "Редактирование тренировки" : "Создание тренировки", workoutId.value ? `Успешно внесены изменения в тренировку '${workout.value.name}'` : `Тренировка '${workout.value.name}' успешно создана`)
  router.push('/workout/list')
}

const selectExerciseModal = ref<boolean>(false);

const addExercise = (exercise: ExerciseType) => {
  remapData()
  selectExerciseModal.value = false;
  workout.value.blocks.push({
    exerciseId: exercise.id,
    elements: []
  })
  computeBlocks()
}

const removeExercise = (index: number) => {
  remapData()
  let newBlocks: ExerciseBlockRegistry[] = []
  for (let i = 0; i < workout.value.blocks.length; i++) {
    if (i !== index) {
      newBlocks.push(workout.value.blocks[i])
    }
  }
  workout.value.blocks = newBlocks;
  computeBlocks()
}

const handleSubmit = (event: Event) => {
  event.preventDefault()
}

</script>

<template>
  <main class="mx-auto mt-4 lg:w-[50%] mb-16 flex flex-col gap-4">
    <h1 class="text-[32px] font-bold">{{ workoutId ? 'Редактирование тренировки' : 'Создание тренировки' }}</h1>
    <form class="flex gap-2 flex-col" @submit="handleSubmit">
      <LazyInputField v-model:value="workout.name" :wrong="verify && !workout.name"
                  placeholder="Например, 'Тренировка груди'" wrong-text="Название не должно быть пустым">Название для
        тренировки
      </LazyInputField>
      <LazyInputArea v-model:value="workout.description" :wrong="verify && !workout.description"
                 placeholder="Опишите тренировку">Описание тренировки
      </LazyInputArea>
      <Button class="w-full" @click="pushWorkout"> Сохранить</Button>
    </form>

    <LazyWorkoutCreatorGroup v-model:assigned-groups="workout.workoutGroups" :validate="verify"></LazyWorkoutCreatorGroup>

    <h1 class="text-[24px] font-bold">Упражнения</h1>
    <section class="flex flex-col gap-2">
      <LazyExercisesModalChoose v-model:active="selectExerciseModal" @add="addExercise"></LazyExercisesModalChoose>
      <LazyWorkoutExerciseCard v-for="(item, index) in exerciseBlocks" v-model:elements="item.elements"
                           v-model:exercise="item.exercise"
                           :validate="verify" removable
                           @remove="removeExercise(index)"></LazyWorkoutExerciseCard>
      <LazyButton class="w-full" @click="selectExerciseModal=true"> Добавить новое</LazyButton>
      <div class="translate-y-full">
        <TransitionContext>
          <span v-if="verify && exerciseBlocks.length == 0" :class="verify ? 'text-destructive' : ''"
                class="absolute w-full text-center">В тренировке должно быть хотя-бы одно упражнение</span>
        </TransitionContext>
      </div>
    </section>

  </main>
</template>

<style scoped>

</style>