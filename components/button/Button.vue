<script lang="ts" setup>

import type {ButtonType} from "~/types/util.type";

const props = defineProps({
  destructive: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String as () => ButtonType,
    default: 'button',
    validator: (value: ButtonType) => {
      return ['button', 'submit', 'reset'].includes(value);
    },
  }
})

</script>

<template>
  <button :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'" :disabled="disabled" :type="type">
    <Card :class="[
          destructive ? 'bg-red-500/50 dark:bg-red-500/50 hover:bg-red-500/60 hover:dark:bg-red-500/60' : '',
          disabled ? 'bg-neutral-500/50 dark:bg-neutral-500/50 hover:bg-neutral-500/60 hover:dark:bg-neutral-500/60' : '',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          ].join(' ')" class="px-[24px] py-[16px] transition duration-300" hoverable>
      <slot></slot>
    </Card>
  </button>
</template>

<style scoped>

</style>