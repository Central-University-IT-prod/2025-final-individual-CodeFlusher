<script lang="ts" setup>

import {XMarkIcon} from "@heroicons/vue/24/outline";

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  emoji: {
    type: String,
    default: ''
  },
  removable: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['remove'])

</script>

<template>
  <div class="flex p-3">
    <h1 class="text-[24px]">{{ emoji }}</h1>
    <h1 class="text-subtitle text-[20px] my-auto">{{ name }}</h1>
    <XMarkIcon v-if="removable" class="size-6 cursor-pointer my-auto ml-auto text-subtitle"
               @click="$emit('remove')"></XMarkIcon>

  </div>
</template>

<style scoped>

</style>