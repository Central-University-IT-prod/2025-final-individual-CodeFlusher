<script lang="ts" setup>
import {defaultInventoryItems} from "~/stores/inventory.store";
import type {ExerciseType, Identifiable, InventoryItem} from "~/types/exercise.type";
import {anyIdInDeepArray, deepFilterArray} from "~/scripts/utils";
import {dispatchErrorNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";

const {getAllItems} = useExerciseStore()

const storage = useInventoryRegistry();

const {registeredInventoryItems} = storeToRefs(storage);

const {register, removeItem} = storage;

useHead({
  title: 'Список спортинвентаря',
})

const modalItem = ref<InventoryItem | undefined>()

const modalState = ref<boolean>(false)
const verifyState = ref<boolean>(false)
const failedState = ref<boolean>(false)

const router = useRouter()

const filterAllItemsById = (identifiable: Identifiable) => {
  return deepFilterArray(getAllItems(), (item: Identifiable) => (item as ExerciseType).inventory, identifiable)
}

const filteredItems = computed(() => {
  return filterAllItemsById;
})

const modalDeleteAction = () => {

  if (!modalItem.value) {
    dispatchErrorNotification("Редактирование инвентаря", "Не удалось удалить предмет спортинвентаря")
    return;
  }

  const anyId = anyIdInDeepArray(getAllItems(), (i: Identifiable) => (i as ExerciseType).inventory, modalItem.value)

  modalState.value = false;
  if (anyId) {
    failedState.value = true;
  } else {
    verifyState.value = true;
  }
}

const modalCopyAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Редактирование инвентаря", "Не удалось отредактировать предмет спортинвентаря")
    return;
  }
  const newExercise = JSON.parse(JSON.stringify(modalItem.value))
  newExercise.id = `custom-inventory-item-${crypto.randomUUID()}`,
      newExercise.isDefault = false;
  newExercise.name = newExercise.name + ' (Копия)'
  register(newExercise)
  modalState.value = false;
  dispatchSuccessNotification('Редактирование инвентаря', `Предмет инвентаря '${modalItem.value.name}' было успешно скопирован в '${newExercise.name}'`)
}

const modalEditAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Редактирование инвентаря", "Не удалось отредактировать предмет спортинвентаря")
    return
  }
  router.push(`/inventory/new?id=${modalItem.value.id}`)
}

const deleteItem = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Удаление инвентаря", "Невозможно удалить предмет инвентаря")
    return;
  }
  removeItem(modalItem.value);
  verifyState.value = false
  dispatchSuccessNotification("Удаление инвентаря", `Элемент спортинвентаря '${modalItem.value.name}' был успешно удален`)
}

const showModal = (item: InventoryItem) => {
  modalItem.value = item;
  modalState.value = true;
}

</script>

<template>
  <div class="flex pt-8 w-fit lg:w-[40%] flex-col mx-auto">

    <LazyEditModal v-model:active="modalState" :modal-item="modalItem" @copy="modalCopyAction"
                   @delete="modalDeleteAction"
                   @edit="modalEditAction">{{
        modalItem!.emoji
      }}
      {{ modalItem!.name }}
    </LazyEditModal>

    <LazyEditSure v-model:active="verifyState" @delete="deleteItem">{{ modalItem!.emoji || '' }} {{ modalItem!.name }}
    </LazyEditSure>

    <LazyModal v-model:active="failedState">
      <h1 class="text-[32px] font-medium">Невозможно удалить "<b>{{ modalItem!.name }}</b>"</h1>
      <h2 class="text-subtitle text-[24px]">Существует упражнение, где используется данный предмет инвентаря. Отвяжите
        упражнение, а
        затем попробуйте снова</h2>
      <span class="m-auto cursor-pointer w-full text-center text-[24px]" @click="failedState=false">Понятно</span>
    </LazyModal>

    <div class="flex w-full justify-between h-fit gap-2 flex-col">
      <h1 class="text-[32px] my-auto">Спортинвентарь</h1>
      <NuxtLink to="/inventory/new">
        <Button class="text-[20px] w-full">Добавить спортинвентарь</Button>
      </NuxtLink>
    </div>
    <div v-if="registeredInventoryItems.length > 0" class="mt-8 flex flex-col w-full gap-2">
      <h2 class="text-[24px]">Созданный спортинвентарь </h2>
      <InventoryCard v-for="item in registeredInventoryItems" :key="item.id" :emoji="item.emoji"
                     :is-default="item.isDefault"
                     :linked-items="filteredItems(item).length" :title="item.name" class="mt-2" @edit="showModal(item)">
      </InventoryCard>
    </div>
    <div class="mt-8 flex gap-2 flex-col w-full">
      <h2 class="text-[24px]">Стандартный спортинвентарь</h2>
      <InventoryCard v-for="item in defaultInventoryItems" :emoji="item.emoji" :is-default="item.isDefault"
                     :linked-items="filteredItems(item).length" :title="item.name" @edit="showModal(item)">
      </InventoryCard>
    </div>
  </div>

</template>

<style scoped>

</style>