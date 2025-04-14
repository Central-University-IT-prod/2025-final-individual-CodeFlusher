<script lang="ts" setup>

const modalState = defineModel<boolean>('active', {default: false})

const emits = defineEmits(['delete'])

</script>

<template>

  <Modal v-model:active="modalState">
    <h1 class="text-[24px] lg:text-[32px] font-medium break-all">Вы точно хотите удалить
      "<b>
        <slot></slot>
      </b>"?
    </h1>
    <h2 class="text-subtitle text-[20px] lg:text-[24px]">Это действие нельзя отменить</h2>
    <div
        class="flex w-full text-[20px] lg:text-[24px] lg:flex-row-reverse lg:justify-between max-lg:flex-col gap-2 mt-2">
      <Button class="w-fit max-lg:w-full" destructive @click="$emit('delete')">Удалить</Button>
      <span class="my-auto cursor-pointer max-lg:w-full text-center" @click="modalState=false">Отменить</span>
    </div>
  </Modal>

</template>

<style scoped>

</style>