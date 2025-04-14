<script lang="ts" setup>

import type {ExerciseGroup} from "~/types/exercise.type";
import {dispatchErrorNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";

useHead({
  title: 'Создание группы упражнений',
})

const {registerGroup, getById} = useExerciseGroupRegistry()

const generatedGroup = ref<ExerciseGroup>({
  id: `custom-exercise-group-${crypto.randomUUID()}`,
  name: '',
  isDefault: false
})

const route = useRoute()
const router = useRouter()
const groupId = computed(() => route.query.id as string ?? '')

if (groupId.value) {
  const value = getById(groupId.value);
  if (value) {
    generatedGroup.value = value;
  } else {
    dispatchErrorNotification("Редактирование групп упражнений", "Не удалось изменить группу упражнений")
    router.back()
  }
}

const isWrongName = ref<boolean>(false);

const validate = ref<boolean>(false);

const push = (e: Event) => {
  e.preventDefault();
  validate.value = true;
  if (!generatedGroup.value.name) {
    return
  }

  generatedGroup.value.name = generatedGroup.value.name.trim()

  registerGroup(generatedGroup.value)
  dispatchSuccessNotification(!groupId.value ? "Создание группы упражнений" : 'Редактирование группы упражнений', `Группа упражнений '${generatedGroup.value.name}' была успешно ${!groupId ? 'создана' : 'изменена'}`)
  router.push('/exercise/group/list')
}

</script>

<template>

  <form class="mx-auto mt-8 lg:w-[40%] flex flex-col gap-2" @submit="push">
    <ButtonBack></ButtonBack>
    <h1 v-if="!groupId" class="text-[32px] font-bold">Создание группы упражнений</h1>
    <h1 v-if="!!groupId" class="text-[32px] font-bold">Изменение группы упражнений</h1>
    <InputField v-model:value="generatedGroup.name" :wrong="validate&&!generatedGroup.name"
                placeholder="Например, 'Упражнения на ноги'">
      Название для группы
    </InputField>
    <Button class="mt-4" @click="push">Сохранить</Button>
  </form>

</template>

<style scoped>

</style>