<template>
  <button @click="active = !active">
    <div class="flex cursor-pointer gap-1">
      <slot name="button"></slot>
      <ChevronDownIcon :class="active ? '-rotate-90' : 'rotate-0'" class="size-6 bg-transparent bg-opacity-0"
                       style="transition: 400ms"></ChevronDownIcon>
    </div>
    <TransitionContext v-if="!disabledTransition">
      <div v-if="active" :class="notAbsolute ? '' : 'absolute'" class="w-fit z-10">
        <slot name="options"></slot>
      </div>
    </TransitionContext>
    <div v-if="active && disabledTransition" :class="notAbsolute ? '' : 'absolute'" class="w-fit z-10">
      <slot name="options"></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>

import {ChevronDownIcon} from "@heroicons/vue/24/outline";

const active = defineModel<Boolean>('active')

const props = defineProps({
  notAbsolute: {
    type: Boolean,
    default: false
  },
  disabledTransition: {
    type: Boolean,
    default: false
  }
})

</script>