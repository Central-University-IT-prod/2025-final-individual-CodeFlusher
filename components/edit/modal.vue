<script lang="ts" setup>

import type {DefaultItem, Identifiable} from "~/types/exercise.type";

defineEmits(['delete', 'copy', 'edit'])

const modalState = defineModel<Boolean>('active', {default: false})

const props = defineProps({
  modalItem: {
    type: Object as () => Identifiable & DefaultItem,
    default: {
      id: '',
      isDefault: true,
    }
  }
})

</script>

<template>
  <Modal v-model:active="modalState">
    <h1 class="text-[24px] lg:text-[32px] font-medium break-all">Редактирование "<b>
      <slot/>
    </b>"
    </h1>
    <h2 v-if="!modalItem!.isDefault" class="text-subtitle text-[16px] lg:text-[24px]">Выберете действие, которое
      хотите выполнить</h2>
    <h2 v-if="modalItem!.isDefault" class="text-subtitle text-[16px] lg:text-[24px]">Это упражнение является
      стандартным, его можно только скопировать</h2>
    <Button v-if="!modalItem!.isDefault" class="w-full mt-2" @click="$emit('edit')">Редактировать</Button>
    <Button class="w-full mt-2" @click="$emit('copy')">Создать копию</Button>
    <Button v-if="!modalItem!.isDefault" class="w-full mt-2" destructive @click="$emit('delete')">Удалить</Button>
    <span class="mx-auto text-subtitle text-[20px] cursor-pointer mt-4" @click="modalState=false">Отменить</span>
  </Modal>
</template>

<style scoped>

</style>