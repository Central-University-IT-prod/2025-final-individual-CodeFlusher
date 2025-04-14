<script lang="ts" setup>

import {ExerciseAdditionalFieldType} from "~/types/workout.type";
import {ExclamationTriangleIcon, TrashIcon} from "@heroicons/vue/24/outline";

const primaryField = defineModel<number>('repeats', {default: 0})
const secondaryField = defineModel<number>('secondary', {default: 0})
const done = defineModel<boolean>('done', {default: false})

const props = defineProps<{
  additionalField: ExerciseAdditionalFieldType,
  checkable?: boolean,
  primary?: number,
  secondary?: number
}>()

const emits = defineEmits(['remove', 'change', 'update'])

const getPlaceholder = computed(() => {
  switch (props.additionalField) {
    case ExerciseAdditionalFieldType.DISTANCE:
      return 'Расстояние';
    default:
      return 'Вес грузов'
  }
})

const needField = computed(() => {
  return props.additionalField === ExerciseAdditionalFieldType.WEIGHT
})

</script>

<template>

  <Checkbox v-model:state="done" :hidden="!checkable" @change="val => $emit('change', val)">
    <div class="flex flex-col w-full">
      <div class="flex gap-2 w-full">
        <InputField v-model:value="primaryField" :class="needField ? 'max-w-1/4 min-w-1/4' : 'w-full'" :max="10000"
                    disable-validation
                    placeholder="Количество повторений" type="number" @input="$emit('update')"></InputField>
        <InputField v-if="needField" v-model:value="secondaryField" :max="500" :placeholder="getPlaceholder"
                    class="w-full"
                    disable-validation type="number" @input="$emit('update')"></InputField>
        <TrashIcon class="min-w-6 ml-auto max-w-6 aspect-square text-destructive my-auto cursor-pointer"
                   @click="$emit('remove')"></TrashIcon>
      </div>
      <TransitionItem>
        <div v-if="primaryField > (primary || 15) || secondaryField > (secondary || 60)"
             class="flex mt-2 gap-2 p-2 w-full rounded-3xl bg-destructive/20 border-destructive/50 border">
          <ExclamationTriangleIcon class="min-w-6 max-w-6 aspect-square text-destructive"></ExclamationTriangleIcon>
          <span class="text-destructive/70">Высокая нагрузка может приводить к физическим травмам и проблемам со здоровьем</span>
        </div>
      </TransitionItem>
    </div>

  </Checkbox>


</template>

<style scoped>

</style>