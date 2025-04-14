<script lang="ts" setup>

import {type AppNotification, NotificationType} from "~/types/notification.type";
import {CheckCircleIcon, InformationCircleIcon, XCircleIcon} from "@heroicons/vue/24/outline";

const props = defineProps<AppNotification>()

const getBackground = computed(() => {
  switch (props.type) {
    case NotificationType.ERROR:
      return 'bg-red-500/15'
    case NotificationType.SUCCESS:
      return 'bg-green-500/15'
    default:
      return 'bg-accent/15'
  }
})

const getBorder = computed(() => {
  switch (props.type) {
    case NotificationType.ERROR:
      return 'border-red-500/25'
    case NotificationType.SUCCESS:
      return 'border-green-500/25'
    default:
      return 'border-accent/25'
  }
})


const getBar = computed(() => {
  switch (props.type) {
    case NotificationType.ERROR:
      return 'bg-red-500/50'
    case NotificationType.SUCCESS:
      return 'bg-green-500/50'
    default:
      return 'bg-accent/50'
  }
})

const getComponent = computed(() => {
  switch (props.type) {
    case NotificationType.ERROR:
      return XCircleIcon
    case NotificationType.SUCCESS:
      return CheckCircleIcon
    default:
      return InformationCircleIcon
  }
})

const width = ref<number>(0)
setTimeout(() => {
  width.value = 100
}, 1)

</script>

<template>
  <div :class="[
        getBackground,
        getBorder,
        'rounded-3xl border flex flex-col backdrop-brightness-150 overflow-hidden',
    ].join(' ')">
    <div class="mx-6 mt-4 flex gap-2">
      <component :is="getComponent" class="size-6 aspect-square my-auto"/>
      <h1 class="text-[20px] font-bold">{{ title }}</h1>
    </div>
    <h1 class="mx-6 text-[16px] text-subtitle">{{ message }}</h1>
    <div :class="['h-0.5 mt-4', getBar].join(' ')" :style="{
        width: `calc(${width}%)`,
        transition: `width 5000ms ease-in`
      }"></div>
  </div>
</template>

<style scoped>

</style>