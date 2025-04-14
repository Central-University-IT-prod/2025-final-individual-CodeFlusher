<script lang="ts" setup>

import {PencilSquareIcon} from "@heroicons/vue/24/outline";

const props = defineProps({
  emoji: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: ''
  },
  isDefault: {
    type: Boolean,
    default: true,
  },
  linkedItemsTitle: {
    type: String,
    default: "Свзязанных упражнений"
  },
  linkedItems: {
    type: Number,
    default: 0,
  },
  disableEdit: {
    type: Boolean,
    default: false,
  },
  showLinkedItems: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['edit'])

</script>

<template>
  <CardSecondary class="text-[20px] flex flex-col p-4 gap-2">
    <div class="flex gap-2">
      <h2 v-if="emoji">{{ emoji }}</h2>
      <h2 class="w-full break-all">
        {{ title }}
      </h2>

      <PencilSquareIcon v-if="!disableEdit" class="size-8 min-w-8 max-w-8 aspect-square my-auto ml-auto cursor-pointer"
                        @click="$emit('edit')"/>
      <slot></slot>
    </div>

    <span v-if="showLinkedItems" class="text-subtitle text-[16px]">
      {{ linkedItemsTitle }}: {{ linkedItems }}
    </span>

  </CardSecondary>
</template>

<style scoped>

</style>