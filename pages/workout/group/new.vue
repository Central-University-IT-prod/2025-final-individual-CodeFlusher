<script lang="ts" setup>

import {
  dispatchErrorNotification,
  dispatchInfoNotification,
  dispatchSuccessNotification
} from "~/scripts/notification.utils";
import type {WorkoutGroup} from "~/types/workout.type";

useHead({
  title: 'Создание спортинвентаря',
})

const generatedWorkoutGroup = ref<WorkoutGroup>({
  id: `custom-inventory-item-${crypto.randomUUID()}`,
  name: '',
  isDefault: false
})
const {registerWorkoutGroup, getWorkoutGroupById} = useWorkoutGroupRegistry()

const route = useRoute()
const router = useRouter()
const groupId = computed(() => route.query.id as string ?? '')

if (groupId.value) {
  const value = getWorkoutGroupById(groupId.value);
  if (value) {
    if (value.isDefault) {
      dispatchInfoNotification("Редактирование групп тренировок", "Невозможно изменить стандартную группу тренировок")
      router.back();
    }
    generatedWorkoutGroup.value = value;
  } else {
    dispatchErrorNotification("Редактирование групп тренировок", "Не удалось изменить группу тренировок: группа не найдена")
    router.back()
  }
}

const validate = ref<boolean>(false);

const push = (e: Event) => {
  e.preventDefault()
  validate.value = true
  if (!generatedWorkoutGroup.value.name) {
    return
  }
  generatedWorkoutGroup.value.name = generatedWorkoutGroup.value.name.trim()
  registerWorkoutGroup(generatedWorkoutGroup.value)
  dispatchSuccessNotification(!!groupId.value ? "Редактирование группы упражнений" : "Создание упражнения", !!groupId.value ? `Группа упражнений '${generatedWorkoutGroup.value.name}' была успешно изменена` : `Группа упражнений '${generatedWorkoutGroup.value.name}' была успешно изменена`)
  router.push('/workout/group/list')
}

</script>

<template>

  <form class="mx-auto mt-8 lg:w-[40%] flex flex-col gap-2" @submit="push">
    <ButtonBack></ButtonBack>

    <h1 class="text-[32px] font-bold">{{
        !!groupId ? 'Редактирование группы тренировок' : 'Создание группы тренировок'
      }}</h1>
    <InputField v-model:value="generatedWorkoutGroup.name"
                :wrong="validate && !generatedWorkoutGroup.name"
                placeholder="Например, 'Тренировки на спину'">
      Название для группы тренировок
    </InputField>
    <Button type="submit" @click="push">Сохранить</Button>
  </form>

</template>

<style scoped>

</style>