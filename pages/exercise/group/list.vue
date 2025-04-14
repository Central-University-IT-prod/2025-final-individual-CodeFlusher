<script lang="ts" setup>
import {defaultExerciseGroups} from "~/stores/group.exercise.store";
import type {ExerciseGroup, ExerciseType, Identifiable} from "~/types/exercise.type";
import {anyIdInDeepArray, deepFilterArray} from "~/scripts/utils";
import {dispatchErrorNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";

const storage = useExerciseGroupRegistry();
const {getAllItems} = useExerciseStore();

const {registeredGroups} = storeToRefs(storage);

const {removeItem, registerGroup} = storage;

useHead({
  title: 'Список групп упражнений',
})

const router = useRouter()

const modalState = ref<boolean>(false)
const verifyState = ref<boolean>(false)
const failedState = ref<boolean>(false)
const modalItem = ref<ExerciseGroup>();

const modalCopyAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Редактирование группы упражнений", "Невозможно копировать группу упражнений")
    return;
  }
  const newGroup = JSON.parse(JSON.stringify(modalItem.value))
  newGroup.id = `custom-inventory-item-${crypto.randomUUID()}`
  newGroup.isDefault = false;
  newGroup.name = newGroup.name + ' (Копия)'
  registerGroup(newGroup)
  modalState.value = false;
  dispatchSuccessNotification('Редактирование группы упражнений', `Группа упражнений '${modalItem.value.name}' была успешно скопирована в '${newGroup.name}'`)
}

const modalEditAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Удаление группы упражнений", "Невозможно редактировать группу упражнений")
    return;
  }
  router.push(`/exercise/group/new?id=${modalItem.value.id}`)
}

const filterAllItemsById = computed(() => (identifiable: Identifiable) => {
  return deepFilterArray(getAllItems(), (item: Identifiable) => (item as ExerciseType).assignedGroups, identifiable)
})


const modalDeleteAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Удаление группы упражнений", "Невозможно удалить группу упражнений")
    return;
  }
  const anyId = anyIdInDeepArray(getAllItems(), (item: Identifiable) => (item as ExerciseType).assignedGroups, modalItem.value)

  modalState.value = false;
  if (anyId) {
    failedState.value = true;
  } else {
    verifyState.value = true;
  }
}

const showModal = (item: ExerciseGroup) => {
  modalItem.value = item;
  modalState.value = true;
}

const deleteItem = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Удаление группы упражнений", "Невозможно удалить группу упражнений")
    return;
  }
  removeItem(modalItem.value);
  verifyState.value = false
  dispatchSuccessNotification("Удаление группы упражнений", `Группа упражнений '${modalItem.value.name}' была успешно удалена`)
}

</script>

<template>

  <div class="flex gap-8 pt-8 w-fit lg:w-[40%] flex-col mx-auto">
    <LazyEditModal v-model:active="modalState" :modal-item="modalItem" @copy="modalCopyAction"
                   @delete="modalDeleteAction"
                   @edit="modalEditAction">
      {{ modalItem!.name }}
    </LazyEditModal>

    <LazyEditSure v-model:active="verifyState" @delete="deleteItem">{{ modalItem!.name }}</LazyEditSure>

    <LazyModal v-model:active="failedState">
      <h1 class="text-[32px] font-medium">Невозможно удалить "<b>{{ modalItem!.name }}</b>"</h1>
      <h2 class="text-subtitle text-[24px]">Существует упражнение, привязанное к данной группе. Отвяжите упражнение, а
        затем попробуйте снова</h2>
      <span class="m-auto cursor-pointer w-full text-center text-[24px]" @click="failedState=false">Понятно</span>
    </LazyModal>
    <div class="flex w-full justify-between h-fit gap-2 flex-col">
      <h1 class="text-[32px] my-auto">Группы упражнений</h1>
      <NuxtLink to="/exercise/group/new">
        <Button class="text-[20px] w-full">Добавить группу</Button>
      </NuxtLink>
    </div>
    <div v-if="registeredGroups.length > 0" class="flex flex-col w-full gap-2">
      <h2 class="text-[24px]">Созданные группы </h2>
      <InventoryCard v-for="item in registeredGroups" :key="item.id" :is-default="item.isDefault"
                     :linked-items="filterAllItemsById(item).length" :title="item.name" @edit="showModal(item)">
      </InventoryCard>
    </div>
    <div class="flex gap-2 flex-col w-full">
      <h2 class="text-[24px]">Стандартные группы</h2>
      <InventoryCard v-for="item in defaultExerciseGroups" :is-default="item.isDefault"
                     :linked-items="filterAllItemsById(item).length"
                     :title="item.name"
                     @edit="showModal(item)">

      </InventoryCard>
    </div>
  </div>

</template>

<style scoped>

</style>