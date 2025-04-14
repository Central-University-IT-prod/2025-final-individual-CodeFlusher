<script lang="ts" setup>

import {setupDarkMode} from "~/scripts/darkmode";

import type {NuxtError} from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const router = useRouter()

setupDarkMode()

const goBack = () => {
  return router.back()
}

</script>

<template>
  <NuxtLayout>
    <div class="m-auto mx-auto justify-items-center">
      <h1 class="text-center text-[96px]">🤷</h1>
      <h2 class="text-[48px]">Что то не так! Ошибка {{ error!.statusCode }}</h2>
      <Button @click="goBack"> Вернуться назад</Button>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>