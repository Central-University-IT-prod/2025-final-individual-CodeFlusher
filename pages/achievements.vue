<script lang="ts" setup>

import {getAchievementName, getEmojiForAchievement} from "~/scripts/achievements.utils";

useHead({
  title: "Достижения"
})

const {achievements} = useProfileStore()

const {displayAchievement} = storeToRefs(useProfileStore())

</script>

<template>
  <main class="lg:p-12 p-4 mx-auto lg:w-1/2">
    <ButtonBack/>
    <section class="flex flex-col gap-2 ">
      <h1 class="text-[24px] lg:text-[32px] font-bold">Полученные достижения</h1>
      <span class="text-[20px] lg:text-[24px] text-subtitle"> Здесь вы можете выбрать какое достижение показывать в профиле </span>
    </section>
    <section class="flex flex-col gap-2">
      <TransitionContext>
        <div class="flex gap-2 px-6 py-3 border rounded-3xl border-subtitle">
          <LazyCheckboxRadio :active="!displayAchievement"></LazyCheckboxRadio>
          <input id="radio-achievements-none" v-model="displayAchievement" :value="''" name="radio-achievements"
                 type="radio"/>
          <label class="text-[24px] font-medium my-auto" for="radio-achievements-none">Без достижения</label>
        </div>
      </TransitionContext>
      <TransitionContext v-for="(item, index) in achievements" :delay="`${100+index*100}ms`">
        <div class="flex gap-2 px-6 py-3 border rounded-3xl border-subtitle">
          <LazyCheckboxRadio :active="displayAchievement === item"></LazyCheckboxRadio>

          <input :id="`radio-achievements-${item}`" v-model="displayAchievement" :value="item" name="radio-achievements"
                 type="radio"/>
          <label :for="`radio-achievements-${item}`"
                 class="text-[24px] font-medium ">{{ getEmojiForAchievement(item) }}{{ getAchievementName(item) }}</label>
        </div>
      </TransitionContext>
    </section>
  </main>
</template>

<style scoped>

</style>