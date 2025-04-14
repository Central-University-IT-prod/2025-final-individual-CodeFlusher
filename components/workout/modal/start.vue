<script lang="ts" setup>

const startModal = defineModel<boolean>('active', {default: false})

const emits = defineEmits(['start'])

</script>

<template>
  <Modal v-model:active="startModal">
    <div class="flex flex-col gap-4">
      <h1 class="text-[24px] lg:text-[32px]">Начать тренировку '<b>
        <slot></slot>
      </b>'
      </h1>
      <Button @click="$emit('start')">Начать</Button>
      <span class="w-full text-center cursor-pointer" @click="startModal=false">Отменить</span>
    </div>
  </Modal>
</template>

<style scoped>

</style>