<script lang="ts" setup>

import type {InventoryItem} from "~/types/exercise.type";
import {dispatchErrorNotification, dispatchSuccessNotification} from "~/scripts/notification.utils";

useHead({
  title: 'Создание спортинвентаря',
})

const generatedInventoryItem = ref<InventoryItem>({
  id: `custom-inventory-item-${crypto.randomUUID()}`,
  name: '',
  isDefault: false
})
const {register, getInventoryItemById} = useInventoryRegistry()


const route = useRoute()
const router = useRouter()
const groupId = computed(() => route.query.id as string ?? '')

const validate = ref<boolean>(false)

if (groupId.value) {
  const value = getInventoryItemById(groupId.value);
  if (value) {
    generatedInventoryItem.value = value;
  } else {
    dispatchErrorNotification("Редактирование инвентаря", "Не удалось изменить предмет инвентаря")
    router.back()
  }
}

const push = (e: Event) => {
  e.preventDefault()
  validate.value = true;
  if (!generatedInventoryItem.value.name) {
    return
  }
  generatedInventoryItem.value.name = generatedInventoryItem.value.name.trim()
  register(generatedInventoryItem.value)
  dispatchSuccessNotification(!!groupId.value ? "Редактирование инвентаря" : "Создание инвентаря", !!groupId.value ? `Предмет инвентаря '${generatedInventoryItem.value.emoji || ''} ${generatedInventoryItem.value.name}' был успешно изменен` : `Предмет инвентаря '${generatedInventoryItem.value.emoji || ''} ${generatedInventoryItem.value.name}' был успешно создан`)
  router.push('/inventory/list')
}

</script>

<template>

  <form class="mx-auto mt-8 lg:w-[40%] flex flex-col gap-2" @submit="push">
    <ButtonBack></ButtonBack>

    <h1 class="text-[32px] font-bold">{{ !!groupId ? 'Редактирование инвентаря' : 'Создание спортинвентаря' }}</h1>
    <InputField v-model:value="generatedInventoryItem.name" :wrong="validate && !generatedInventoryItem.name"
                placeholder="Например, 'Гантели'">
      Название для спортинвентаря
    </InputField>

    <InputField v-model:value="generatedInventoryItem.emoji" placeholder="Например, '💪'">
      Эмоджи, символизирующее инвентарь (опционально)
    </InputField>
    <Button type="submit" @click="push">Сохранить</Button>
  </form>

</template>

<style scoped>

</style>