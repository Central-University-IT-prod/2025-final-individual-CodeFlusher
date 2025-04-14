<template>
  <main class="flex w-full">
    <TransitionDisappear>
      <ModalContainer v-show="showFilterModal" class="lg:hidden">
        <TransitionBottomModal>
          <div class="fixed rounded-t-3xl overflow-x-hidden overflow-y-scroll h-[85vh] w-screen bottom-0 left-0 lg:hidden bg-primary border-t border-secondary" v-show="showFilterModal">
            <button class="mt-6 ml-6" type="button" @click="showFilterModal=false">
              <XMarkIcon class="size-8 "></XMarkIcon>
            </button>
            <ExercisesFilter v-model:filter="filter">{{ filterTitle }}</ExercisesFilter>
            <Button class="w-full p-6" type="button" @click="showFilterModal=false">Сохранить</Button>
          </div>
        </TransitionBottomModal>
      </ModalContainer>
    </TransitionDisappear>
    <div ref="filterDiv" :style="{
      transition: `width 0ms`
    }" class="min-w-fit max-w-fit max-lg:hidden" >
      <ExercisesFilter v-model:filter="filter" class="h-full">{{ filterTitle }}</ExercisesFilter>
    </div>
    <div :style="{
      width: `calc(100vw - ${getFilterWidth}px)`,
      transition: `width 0ms`
    }" class="max-lg:min-w-[100%]">
      <button type="button" class="mb-4 lg:hidden" @click="showFilterModal=true">
        <FunnelIcon class="size-8"></FunnelIcon>
      </button>
      <slot></slot>
    </div>
  </main>

</template>

<script lang="ts" setup>

import type {ExerciseFilter} from "~/types/exercise.type";
import {XMarkIcon, FunnelIcon} from "@heroicons/vue/24/outline";

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  filterTitle: {
    type: String,
    default: "Фильтр упражнений"
  }
})

useHead({
  title: props.title,
})

const showFilterModal = ref<boolean>(false)

const filter = defineModel<ExerciseFilter>('filter');
const filterDiv = ref<HTMLDivElement>();

const getFilterWidth = computed(() => {
  if (!filterDiv.value) {
    return 0;
  }
  return filterDiv.value.getBoundingClientRect().width
})

</script>
