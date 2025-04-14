<script lang="ts" setup>

import type {ExerciseType, InventoryItem, MuscleGroups} from "~/types/exercise.type";

const props = defineProps<{
  exercise: ExerciseType
}>()

const {getInventoryItemById} = useInventoryRegistry()
const emits = defineEmits(['choose'])

const inventoryItems = computed(() => {
  if (!props.exercise.inventory) {
    return []
  }

  let items: InventoryItem[] = []

  props.exercise.inventory.forEach(item => {
    const value = getInventoryItemById(item);
    if (value) {
      items.push(value);
    }
  });
  return items;
})

const muscleGroups = computed(() => {
  if (!props.exercise.muscleGroups) {
    return []
  }

  let items: MuscleGroups[] = []

  props.exercise.muscleGroups.forEach(item => {
    const value = getMuscleGroupById(item);
    if (value) {
      items.push(value);
    }
  });
  return items;
})
</script>

<template>
  <div class="flex gap-2" @click="$emit('choose')">
    <div class="flex flex-col gap-2">
      <h3 class="text-[24px] font-medium">
        {{ exercise.name }}
      </h3>
      <div v-if="muscleGroups.length > 0" class="">
        <h3 class="text-[16px]"> Группы мышц </h3>
        <div>
          <InventoryMiniCard v-for="item in muscleGroups" :emoji="item.emoji" :text="item.name"></InventoryMiniCard>
        </div>
      </div>
      <div v-if="inventoryItems.length > 0" class="">
        <h3 class="text-[16px]"> Инвентарь </h3>
        <div>
          <InventoryMiniCard v-for="item in inventoryItems" :emoji="item.emoji" :text="item.name"></InventoryMiniCard>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>