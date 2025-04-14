<script lang="ts" setup>

import {definePageMeta} from "#imports";
import type {Profile} from "~/types/profile.type";
import {LazyRegisterData, LazyRegisterName, LazyRegisterTarget, LazyRegisterTrack, LazyRegisterWelcome} from "#components";

definePageMeta({
  layout: "headless",
})

useHead({
  title: 'Создание профиля'
})

const store = useProfileStore()

const {finishRegister} = store

const profile = storeToRefs(store)

const components = ref<Component[]>([
  LazyRegisterWelcome,
  LazyRegisterName,
  LazyRegisterTrack,
  LazyRegisterData,
  LazyRegisterTarget
])

const currentPage = ref<number>(0)

const active = ref<boolean>(false)

setTimeout(() => {
  active.value = true
}, 1)

const router = useRouter()

const next = (e: Event) => {
  if (e) {
    e.preventDefault();
  }
  if (currentPage.value === components.value.length - 1) {
    finishRegister()
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
    return
  }
  currentPage.value += 1
}

const updateProfile = (p: Profile) => {
  profile.profile.value.name = p.name
  profile.profile.value.weight = p.weight
  profile.profile.value.height = p.height
  profile.profile.value.track = p.track
}

const contentRef = ref<HTMLDivElement>();

const getHeight = computed(() => {
  if (!contentRef.value) {
    return 0;
  }

  return contentRef.value.getBoundingClientRect().y
})

</script>

<template>
  <div class="mx-auto flex gap-2 flex-col w-full overflow-hidden">
    <RegisterTransitionedHead>
      <div v-if="active" class="absolute flex gap-2 left-1/2 translate-y-1/2 -translate-x-1/2">
        <img class="h-16 lg:h-32 my-auto aspect-square" src="/icons/strenght.png" alt="Logo">
        <h1 class="text-[48px] lg:text-[96px] my-auto font-bold">
          Fit4You
        </h1>
      </div>
    </RegisterTransitionedHead>
    <RegisterTransitionedBody>
      <div v-if="active" class="absolute w-screen h-screen overflow-hidden">
        <TransitionCycle>
          <div :key="currentPage" ref="contentRef" :style="{
            maxHeight: `calc(100vh - 12rem)`,
          }" class="flex absolute top-48 w-full lg:p-12 p-4 overflow-y-scroll overflow-x-hidden">
            <component :is="components[currentPage]" :key="currentPage" v-model:profile="profile" lazy="true"
                       @next="next" @update="updateProfile"></component>
          </div>
        </TransitionCycle>
      </div>
    </RegisterTransitionedBody>
  </div>
</template>

<style scoped>


</style>