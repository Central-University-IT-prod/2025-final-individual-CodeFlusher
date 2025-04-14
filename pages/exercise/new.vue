<script lang="ts" setup>

import {type ExerciseType} from "~/types/exercise.type";
import {ExerciseAdditionalFieldType} from "~/types/workout.type";
import {dispatchInfoNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";
import {completeExerciseFrom} from "~/scripts/workout.utils";

const {registerNew, removeItem, getExerciseById} = useExerciseStore()
const router = useRouter()

useHead({
  title: 'Новое упражнение'
})

const createdExercise = ref<ExerciseType>({
  id: `custom-exercise-${crypto.randomUUID()}`,
  name: '',
  description: '',
  descriptionLong: [''],
  url: '',
  difficulty: 0,
  assignedGroups: [],
  inventory: [],
  muscleGroups: [],
  isDefault: false,
  requireAdditionalFields: ExerciseAdditionalFieldType.NONE,
})

const route = useRoute()
const intentObjectId = computed(() => route.query.id as string ?? '')


if (intentObjectId.value) {
  const value = JSON.parse(JSON.stringify(getExerciseById(intentObjectId.value))) as ExerciseType;
  if (value) {
    createdExercise.value = value;
    createdExercise.value.descriptionLong.push('')
  }
}

const validate = ref<boolean>(false)

const pushExercise = (e: Event) => {
  e.preventDefault()
  validate.value = true
  if (!createdExercise.value) {
    return
  }
  if (!createdExercise.value.name) {
    return;
  }
  if (!createdExercise.value.description) {
    return;
  }
  if (!createdExercise.value.assignedGroups) {
    return;
  }
  if (createdExercise.value.assignedGroups.length === 0) {
    return;
  }
  if (!createdExercise.value.muscleGroups) {
    return;
  }
  if (createdExercise.value.muscleGroups.length === 0) {
    return;
  }

  createdExercise.value.descriptionLong = createdExercise.value.descriptionLong.filter(item => !!item)

  if (createdExercise.value.descriptionLong.length === 0) {
    return;
  }

  createdExercise.value.name = createdExercise.value.name.trim();

  removeItem(createdExercise.value)
  registerNew(createdExercise.value)

  dispatchSuccessNotification(`${!!intentObjectId ? 'Редактирование упражнения' : 'Создание упражнение'}`,
      `${!!intentObjectId ? `Успешно внесены изменения в упражнение '${createdExercise.value.name}'`
          : `Успешно создано упражнение '${createdExercise.value.name}'`}`)

  router.push('/exercise/list')
}

const editAction = () => {
  dispatchInfoNotification("Предпросмотр упражнения", "В режиме предпросмотра упражнения функция редактировать неактивна")
}

const useAction = () => {
  dispatchInfoNotification("Предпросмотр упражнения", "В режиме предпросмотра упражнения функция использовать в упражнении неактивна")
}


const handleSubmit = (event: Event) => {
  event.preventDefault()
}

</script>

<template>

  <main class="mx-auto mt-4 lg:w-[50%] mb-16">
    <form class="flex flex-col gap-4" @submit="handleSubmit">
      <ButtonBack></ButtonBack>

      <h1 v-if="!intentObjectId" class="font-bold text-[32px]">Создание нового упражнения</h1>
      <div v-else class="flex max-lg:flex-col justify-between">
        <h1 class="font-bold text-[32px]">Редактирование упражнения</h1>
      </div>
      <InputField v-model:value="createdExercise.name" :wrong="validate && !createdExercise.name"
                  placeholder="Например, 'Приседания'"
                  type="text">Название для упражнения
      </InputField>
      <InputField v-model:value="createdExercise.description" :wrong="validate && !createdExercise.description"
                  placeholder="Кратко опишите упражнение" type="text">Описание
        упражнения
      </InputField>
      <ExercisesCreatorLongDescription v-model:long="createdExercise.descriptionLong"
                                       :validate="validate"></ExercisesCreatorLongDescription>
      <ExercisesCreatorVideo v-model:url="createdExercise.url"></ExercisesCreatorVideo>
      <ExercisesCreatorField v-model:field="createdExercise.requireAdditionalFields"></ExercisesCreatorField>
      <ExercisesCreatorDifficulty v-model:difficulty="createdExercise.difficulty"></ExercisesCreatorDifficulty>
      <ExercisesCreatorGroup v-model:assigned-groups="createdExercise.assignedGroups"
                             :validate="validate"></ExercisesCreatorGroup>
      <ExercisesCreatorMuscles v-model:muscle-groups="createdExercise.muscleGroups"
                               :validate="validate"></ExercisesCreatorMuscles>
      <ExercisesCreatorInventory v-model:inventory="createdExercise.inventory"></ExercisesCreatorInventory>
      <Button class="w-full" type="submit" @click="pushExercise">Сохранить</Button>
    </form>
    <section class="mt-4">
      <h1 class="font-bold text-[24px]">Предпросмотр</h1>
      <ExercisesCard :editable="false" :exercise="completeExerciseFrom(createdExercise)" @action="useAction"
                     @edit="editAction"></ExercisesCard>
    </section>

  </main>

</template>

<style scoped>

</style>