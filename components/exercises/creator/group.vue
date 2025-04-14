<script lang="ts" setup>

import {excludeEverythingBesides} from "~/scripts/utils";
import type {ExerciseGroup} from "~/types/exercise.type";

const props = defineProps({
  validate: {
    type: Boolean,
    default: false
  }
})

const chosenGroups = defineModel<string[]>('assignedGroups', {default: []})

const {getById, getAllGroups} = useExerciseGroupRegistry()

const remappedGroups = computed(() => {
  let groups: ExerciseGroup[] = []
  if (chosenGroups.value) {
    chosenGroups.value.forEach(group => {
      const value = getById(group)
      if (!value) {
        return
      }
      groups.push(value)
    })
  }
  return groups
})

watch(chosenGroups, () => {
  remappedGroups.value;
})

const notChosenGroups = computed(() => {
  return excludeEverythingBesides(getAllGroups(), remappedGroups.value) as ExerciseGroup[]
})

const pushNew = (id: string) => {
  chosenGroups.value.push(id)
}

const removeById = (id: string) => {
  chosenGroups.value.splice(chosenGroups.value.indexOf(id), 1)
}

</script>

<template>

  <div>

    <label class="text-[24px]" for="categories">Назначенные категории</label>

    <CardSecondary class="p-6">
      <span v-if="chosenGroups.length === 0" :class="validate ? 'text-red-500 dark:text-red-500' : 'text-subtitle'">Не выбрана ни одна категория. Это поле обязательно</span>
      <InventoryFilterCard v-for="item in remappedGroups" :name="item.name" removable
                           @remove="removeById(item.id)"></InventoryFilterCard>
    </CardSecondary>

    <CardSecondary v-if="notChosenGroups.length > 0" id="categories" class="p-6 mt-2">
      <NavigationTab>
        <template v-slot:button>
          <h4 class="my-auto text-subtitle">Выбрать категории</h4>
        </template>
        <template v-slot:options>
          <NavigationWrapper>
            <NavigationContainer>
              <NavigationButton v-for="item in notChosenGroups" @click="pushNew(item.id)">{{ item.name }}
              </NavigationButton>
            </NavigationContainer>
          </NavigationWrapper>
        </template>
      </NavigationTab>
    </CardSecondary>
  </div>

</template>

<style scoped>

</style>