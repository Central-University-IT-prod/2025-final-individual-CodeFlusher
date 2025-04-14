<script lang="ts" setup>

import {type Exercise, ExerciseAdditionalFieldType, type ExerciseElement} from "~/types/workout.type";
import {TrashIcon} from "@heroicons/vue/24/outline";

const exercise = defineModel<Exercise>('exercise')
const elements = defineModel<ExerciseElement[]>('elements')

const props = defineProps({
  validate: {
    type: Boolean,
    default: false
  },
  removable: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: false
  }

})

const emits = defineEmits(['update', 'remove', 'change'])

const descriptionModalState = ref<boolean>(false)

const removeByIndex = (index: number) => {
  if (!elements.value) {
    return;
  }

  let li: ExerciseElement[] = []
  for (let i = 0; i < elements.value.length; i++) {
    if (i !== index) {
      li.push(elements.value[i])
    }
  }
  elements.value = li;
}

const getName = computed(() => {
  if (!exercise.value) {
    return 'exercise'
  }
  return exercise.value.name
})

const getInventory = computed(() => {
  if (!exercise.value) {
    return []
  }
  return exercise.value.inventory
})

const handleCheck = (index: number, value: boolean) => {
  emits('change', value);
  emits('update')
}

</script>

<template>
  <div>

  </div>
  <CardSecondary class="flex flex-col gap-2 p-6">
    <ExercisesDescription v-model:active="descriptionModalState" :exercise="exercise!"></ExercisesDescription>
    <div class="flex gap-2">
      <h1 class="text-[24px] font-bold">{{ getName }}</h1>
      <TrashIcon v-if="removable" class="min-w-6 max-w-6 aspect-square text-destructive my-auto ml-auto cursor-pointer"
                 @click="$emit('remove')"></TrashIcon>
    </div>
    <h2 class="text-[20px]">Инвентарь</h2>
    <div class="flex gap-2">
      <InventoryMiniCard v-for="item in getInventory" :emoji="item.emoji" :text="item.name"></InventoryMiniCard>
    </div>
    <div class="flex flex-col gap-2">
      <span v-if="elements!.length === 0" :class="validate ? 'text-destructive' : ''" class="text-subtitle text-[16px]">Здесь пусто. Заполните хотя-бы один подход</span>
      <ExercisesInput v-for="(item, index) in elements!" v-model:done="item.done"
                      v-model:repeats="item.repeats" v-model:secondary="item.weight"
                      :additional-field="exercise!.requireAdditionalFields"
                      :checkable="checkable" :primary="exercise!.requireAdditionalFields === ExerciseAdditionalFieldType.DISTANCE ? 1000 : 15"
                      @change="(val: boolean)=>handleCheck(index, val)"
                      @remove="removeByIndex(index)"
                      @update="$emit('update')"></ExercisesInput>
    </div>
    <Button class="text-[16px]" @click="elements!.push({repeats: 0}); $emit('update')"> Добавить дополнительный подход
    </Button>
    <span class="text-subtitle text-[20px] cursor-help" @click="descriptionModalState=true">Подробнее</span>
  </CardSecondary>

</template>

<style scoped>

</style>