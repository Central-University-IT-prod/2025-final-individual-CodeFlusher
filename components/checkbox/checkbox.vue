<script lang="ts" setup>

import {CheckIcon} from "@heroicons/vue/24/outline";

const checkboxValue = defineModel<Boolean>('state')
const emits = defineEmits(['change'])

watch(checkboxValue, () => {
  emits('change', checkboxValue.value)
})

const props = defineProps({
  reversed: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div :class="reversed ? 'flex-row-reverse' : 'flex-row'" class="flex gap-2">
    <div v-if="!hidden" class="p-2 border border-color rounded-xl aspect-square h-fit"
         @click="checkboxValue = !checkboxValue">
      <CheckIcon :class="checkboxValue ? 'opacity-100' : 'opacity-0'" class="size-5"/>
    </div>
    <span class="my-auto flex w-full"><slot></slot></span>
  </div>
</template>

<style scoped>

</style>