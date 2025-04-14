<script lang="ts" setup>


import {type Profile, Track} from "~/types/profile.type";
import {getNameForTrack} from "../../scripts/utils";

const profile = defineModel<Profile>('profile', {default: {}})

const track = ref<string>('')

const emits = defineEmits(['update', 'next'])
</script>

<template>
  <main class="w-fit mx-auto">
    <h2 class="text-[32px] font-bold text-center w-full">Выбери своего героя</h2>

    <div class="grid max-lg:grid-cols-1 lg:grid-cols-3 gap-4 mt-4 w-fit mx-auto">
      <div
          v-for="item in Track"
          :class="[
          track==item ? 'shadow-accent' : 'shadow-transparent'
          ].join(' ')" :style="{
            backgroundImage: `url('/images/profile/${item}/level_4.png')`,
            backgroundSize: 'cover',
          }"
          class="shadow-[0_0_0_4px_rgba(0,0,0,2)] overflow-hidden rounded-2xl lg:aspect-square flex origin-center max-lg:h-[150px] lg:size-[200px]"
          @click="profile.track = item; $emit('update', profile); track=item">
        <div class="px-6 py-3 mt-auto backdrop-blur-xl w-full">
          <h3 class="text-[24px] text-white"> {{ getNameForTrack(item) }}</h3>
        </div>
      </div>
    </div>

    <Button :disabled="!track" class="w-full mt-4" @click="$emit('next')">Продолжить</Button>

  </main>
</template>

<style scoped>

</style>