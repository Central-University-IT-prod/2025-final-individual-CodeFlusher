<script lang="ts" setup>

import {MoonIcon} from "@heroicons/vue/24/outline";

const {toggleDarkMode} = useDarkModeController()

</script>

<template>
  <div
      class="w-screen min-h-screen flex flex-col overflow-x-hidden overflow-y-scroll"
  >
    <MoonIcon class="size-6 absolute top-12 right-12 cursor-pointer my-auto max-md:hidden" @click="toggleDarkMode"></MoonIcon>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>