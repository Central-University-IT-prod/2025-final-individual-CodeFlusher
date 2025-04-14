<script lang="ts" setup>
import type {Identifiable} from "~/types/exercise.type";
import {dispatchErrorNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";
import {anyIdInDeepArray} from "~/scripts/utils";
import type {WorkoutGroup, WorkoutRegistryItem} from "~/types/workout.type";

const storage = useWorkoutGroupRegistry();
const {getAllWorkouts} = useWorkoutRegistry();

const {registeredGroups} = storeToRefs(storage);

const {registerWorkoutGroup, removeWorkoutGroup} = storage;

useHead({
  title: 'Список групп упражнений',
})

const router = useRouter()

const modalState = ref<boolean>(false)
const verifyState = ref<boolean>(false)
const failedState = ref<boolean>(false)
const modalItem = ref<WorkoutGroup>();

const modalCopyAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Редактирование группы тренировок", "Невозможно копировать группу тренировок")
    return;
  }
  const newGroup = JSON.parse(JSON.stringify(modalItem.value))
  newGroup.id = `custom-workout-group-${crypto.randomUUID()}`
  newGroup.isDefault = false;
  newGroup.name = newGroup.name + ' (Копия)'
  registerWorkoutGroup(newGroup)
  modalState.value = false;
  dispatchSuccessNotification('Редактирование группы тренировок', `Группа тренировок '${modalItem.value.name}' была успешно скопирована в '${newGroup.name}'`)
}

const modalEditAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Удаление группы тренировок", "Невозможно редактировать группу тренировок")
    return;
  }
  router.push(`/workout/group/new?id=${modalItem.value.id}`)
}

const modalDeleteAction = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Удаление группы тренировок", "Невозможно удалить группу тренировок")
    return;
  }
  const anyId = anyIdInDeepArray(getAllWorkouts(), (item: Identifiable) => (item as WorkoutRegistryItem).workoutGroups, modalItem.value)

  modalState.value = false;
  if (anyId) {
    failedState.value = true;
  } else {
    verifyState.value = true;
  }
}

const showModal = (item: WorkoutGroup) => {
  modalItem.value = item;
  modalState.value = true;
}

const deleteItem = () => {
  if (!modalItem.value) {
    dispatchErrorNotification("Удаление группы тренировок", "Невозможно удалить группу тренировок")
    return;
  }
  removeWorkoutGroup(modalItem.value);
  verifyState.value = false
  dispatchSuccessNotification("Удаление группы тренировок", `Группа тренировок '${modalItem.value.name}' была успешно удалена`)
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
    <div class="flex flex-col w-full justify-between h-fit gap-2">
      <h1 class="text-[32px] my-auto">Группы упражнений</h1>
      <LazyNuxtLink to="/workout/group/new">
        <Button class="text-[20px] w-full">Добавить группу</Button>
      </LazyNuxtLink>
    </div>
    <div v-if="registeredGroups.length > 0" class="flex flex-col w-full gap-2">
      <h2 class="text-[24px]">Созданные группы </h2>
      <InventoryCard v-for="item in registeredGroups" :key="item.id" :is-default="item.isDefault"
                     :linked-items="0" :title="item.name" @edit="showModal(item)">
      </InventoryCard>
    </div>
    <div class="flex gap-2 flex-col w-full">
      <h2 class="text-[24px]">Стандартные группы</h2>
      <InventoryCard v-for="item in defaultWorkoutGroups" :is-default="item.isDefault" :linked-items="0"
                     :title="item.name" @edit="showModal(item)">
      </InventoryCard>
    </div>
  </div>

</template>

<style scoped>

</style>