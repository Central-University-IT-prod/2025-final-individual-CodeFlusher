<script lang="ts" setup>

import {excludeEverythingBesides} from "~/scripts/utils";
import type {InventoryItem} from "~/types/exercise.type";

const chosenItems = defineModel<string[]>('inventory', {default: []})

const {getInventoryItemById, getAllInventoryItems} = useInventoryRegistry()

const remappedItems = computed(() => {
  let groups: InventoryItem[] = []
  if (chosenItems.value) {
    chosenItems.value.forEach(group => {
      const value = getInventoryItemById(group)
      if (!value) {
        return
      }
      groups.push(value)
    })
  }
  return groups
})

watch(chosenItems, () => {
  remappedItems.value;
})

const notChosenItems = computed(() => {
  return excludeEverythingBesides(getAllInventoryItems(), remappedItems.value) as InventoryItem[]
})

const pushNew = (id: string) => {
  chosenItems.value.push(id)
}

const removeById = (id: string) => {
  chosenItems.value.splice(chosenItems.value.indexOf(id), 1)
}

</script>

<template>

  <div>

    <label class="text-[24px]" for="categories">Назначенные предметы инвентаря</label>

    <CardSecondary class="p-6">
      <span v-if="chosenItems.length === 0" class="text-subtitle">Не выбран ни один предмет инвентаря. Если в упражнении инвентарь не требуется, поле можно оставить пустым</span>
      <InventoryFilterCard v-for="item in remappedItems" :name="item.name" removable
                           @remove="removeById(item.id)"></InventoryFilterCard>
    </CardSecondary>

    <CardSecondary v-if="notChosenItems.length > 0" id="categories" class="p-6 mt-2">
      <NavigationTab>
        <template v-slot:button>
          <h4 class="my-auto text-subtitle">Выбрать инвентарь</h4>
        </template>
        <template v-slot:options>
          <NavigationWrapper>
            <NavigationContainer>
              <NavigationButton v-for="item in notChosenItems" @click="pushNew(item.id)">{{ item.name }}
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