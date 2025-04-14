<script lang="ts" setup>

import type {ExerciseFilter, InventoryItem, MuscleGroups} from "~/types/exercise.type";
import {availableMuscleGroups} from "~/stores/muscle.store";
import {useInventoryRegistry} from "~/stores/inventory.store";
import {excludeEverythingBesides} from "~/scripts/utils";

const difficultFilter = ref<boolean[]>([false, false, false]);
const inventoryFilter = ref<InventoryItem[]>([]);
const muscleFilter = ref<MuscleGroups[]>([]);

const {getAllInventoryItems} = useInventoryRegistry();

const filter = defineModel<ExerciseFilter>('filter', {
  default: {
    difficulty: [],
    inventory: [],
    muscleGroups: []
  }
});



const emits = defineEmits(['filter']);

const composeFilter = () => {
  let newFilter: ExerciseFilter = {
    name: nameFilter.value,
    difficulty: [],
    inventory: [],
    muscleGroups: []
  }
  for (let i = 0; i < difficultFilter.value.length; i++) {
    if (difficultFilter.value[i]) {
      newFilter.difficulty.push(i)
    }
  }
  newFilter.inventory = inventoryFilter.value;
  newFilter.muscleGroups = muscleFilter.value;
  filter.value = newFilter;
  emits('filter', filter.value);
}

const nonAddedItems = computed(() => {
  return excludeEverythingBesides(getAllInventoryItems(), inventoryFilter.value)
})

const nonAddedMuscles = computed(() => {
  return excludeEverythingBesides(availableMuscleGroups, muscleFilter.value)
})

const removeInventoryItem = (item: InventoryItem) => {
  inventoryFilter.value = inventoryFilter.value.filter(i => i.id !== item.id)
  composeFilter()
}

const removeMuscleGroup = (item: MuscleGroups) => {
  muscleFilter.value = muscleFilter.value.filter(i => i.id !== item.id)
  composeFilter()
}

const nameFilter = ref<string>('')

const pushInventoryItem = (item: InventoryItem) => {
  inventoryFilter.value.push(item)
  composeFilter()
}

const pushMuscleGroup = (item: MuscleGroups) => {
  muscleFilter.value.push(item)
  composeFilter()
}

watch(difficultFilter, composeFilter)
watch(nameFilter, composeFilter)

</script>

<template>

  <section class="border-color p-6 lg:p-12 border-r border-color flex flex-col gap-[32px] leading-none ">
    <h2 class="font-bold text-[32px] w-fit text-left">
      <slot></slot>
    </h2>
    <InputField v-model:value="nameFilter" class="text-left" placeholder="Поиск по имени">Поиск</InputField>
    <div class="text-left ml-auto flex flex-col gap-2">
      <h3 class="font-medium text-[24px]"> По сложности </h3>
      <Checkbox v-model:state="difficultFilter[0]" reversed @change="composeFilter">Простоe</Checkbox>
      <Checkbox v-model:state="difficultFilter[1]" reversed @change="composeFilter">Среднее</Checkbox>
      <Checkbox v-model:state="difficultFilter[2]" reversed @change="composeFilter">Сложное</Checkbox>
    </div>
    <div class="text-left ml-auto flex flex-col gap-2 w-full">
      <h3 class="font-medium text-[24px] ml-auto"> По инвентарю </h3>
      <CardSecondary class="p-3 w-full flex flex-col gap-2">
        <div v-if="inventoryFilter.length === 0" class="py-1">
          <span class="text-subtitle text-[16px]">Здесь пока пусто.</span>
        </div>
        <InventoryFilterCard v-for="item in inventoryFilter" :id="item.id" :emoji="item.emoji"
                             :is-default="item.isDefault"
                             :name="item.name" removable @remove="removeInventoryItem(item)"></InventoryFilterCard>
      </CardSecondary>
      <CardSecondary v-if="nonAddedItems.length !== 0" class="p-3 w-full">
        <NavigationTab disabled-transition not-absolute>
          <template #button>
            <h1 class="my-auto text-subtitle w-full">
              Добавить фильтр
            </h1>
          </template>
          <template #options>
            <div class="mt-2 flex flex-col w-full">
              <button v-for="item in (nonAddedItems as InventoryItem[])"
                      class="hover:bg-neutral-500/10 w-full text-start rounded-lg" @click="pushInventoryItem(item)">
                <InventoryFilterCard :id="item.id" :emoji="item.emoji" :is-default="item.isDefault" :name="item.name"
                                     @remove=""></InventoryFilterCard>
              </button>
            </div>
          </template>
        </NavigationTab>
      </CardSecondary>
    </div>
    <div class="text-left ml-auto flex flex-col gap-2 w-full">
      <h3 class="font-medium text-[24px] ml-auto"> По группам мышц </h3>
      <CardSecondary class="p-3 w-full flex flex-col gap-2">
        <div v-if="muscleFilter.length === 0" class="py-1">
          <span class="text-subtitle text-[16px]">Здесь пока пусто.</span>
        </div>
        <InventoryFilterCard v-for="item in muscleFilter" :id="item.id" :emoji="item.emoji" :name="item.name" removable
                             @remove="removeMuscleGroup(item)"></InventoryFilterCard>
      </CardSecondary>
      <CardSecondary v-if="nonAddedMuscles.length !== 0" class="p-3 w-full">
        <NavigationTab disabled-transition not-absolute>
          <template #button>
            <h1 class="my-auto text-subtitle w-full">
              Добавить фильтр
            </h1>
          </template>
          <template #options>
            <div class="mt-2 flex flex-col w-full">
              <button v-for="item in (nonAddedMuscles as MuscleGroups[])"
                      class="hover:bg-neutral-500/10 w-full text-start rounded-lg" @click="muscleFilter.push(item)">
                <InventoryFilterCard :id="item.id" :emoji="item.emoji" :name="item.name"
                                     @remove=""></InventoryFilterCard>
              </button>
            </div>
          </template>
        </NavigationTab>
      </CardSecondary>
    </div>
  </section>
</template>

<style scoped>

</style>