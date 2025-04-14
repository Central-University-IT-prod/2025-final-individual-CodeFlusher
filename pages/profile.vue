<script lang="ts" setup>

import {getDeltaExperience, getLevel, getNameForGoal, getTargetForLevel} from "~/scripts/profile.utils";
import {FireIcon, PencilSquareIcon, StarIcon, ArrowTopRightOnSquareIcon} from "@heroicons/vue/24/outline";
import {clamp} from "~/scripts/utils";
import {getColorForAchievement, getEmojiForAchievement} from "~/scripts/achievements.utils";
import {Achievement} from "~/types/achievements.type";

const {prestige} = useProfileStore()

const {profile, prestigeLevel, achievements, displayAchievement} = storeToRefs(useProfileStore())

const router = useRouter()

const editingName = ref<boolean>(false);

const validate = ref<boolean>(false);

useHead({
  title: 'Профиль'
})

const toggleEdit = () => {
  editingName.value = true;
}

const prestigeModal = ref<boolean>(false)

const editedName = ref<string>(profile.value.name)

const saveName = (event: Event) => {
  event.preventDefault()
  validate.value = true
  if (!editedName.value) {
    return
  }
  editingName.value = false
  profile.value.name = editedName.value
}

const showPrestigeTransition = ref<boolean>(false)

const oldPrestige = ref<number>(0);
const newPrestige = ref<number>(0);

const prestigeAction = () => {
  oldPrestige.value = prestigeLevel.value;
  prestige()
  newPrestige.value = prestigeLevel.value;
  showPrestigeTransition.value = true;
  setTimeout(() => {
    showPrestigeTransition.value = false;
  }, 3000)
}
const showPrestigeContext = ref<boolean>(false)

const editingTarget = ref<boolean>(false)

const closeTargetModal = () => {
  editingTarget.value = false
}

const achievementsWord = computed(() => {
  if(achievements.value.length == 0) {
    return 'достижений'
  }

  if (achievements.value.length == 1) {
    return 'достижение'
  }

  if (achievements.value.length < 5) {
    return 'достижения'
  }

  return 'достижений'
})

const routeToAchievementList = () => {
  router.push('/achievements')
}

</script>

<template>
  <main class="mx-auto flex flex-col gap-4 lg:p-12">
    <div class="w-fit mx-auto">
      <img lazy="true" :src="`/images/profile/${profile.track}/level_${clamp(getLevel-1, 0, 4)}.png`"
           alt="Аватар"
           class="size-[300px] translate-y-8 mx-auto aspect-square rounded-full object-cover">
      <div class="absolute p-4 text-[48px] -translate-y-1/2 aspect-square leading-none pt-5">
        {{ getEmojiForAchievement(displayAchievement || ('' as Achievement)) }}
      </div>
      <div :style="{
        background: `${getColorForAchievement(displayAchievement || '' as Achievement)}`,
      }" class="size-[300px] blur-3xl opacity-40 -translate-y-3/4 -z-10 absolute">
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <LazyModal v-model:active="editingName">
        <form class="flex flex-col gap-2" name="edit-name" @submit="saveName">
          <h1 class="text-[32px] font-bold">Изменение имени</h1>
          <LazyInputField v-model:value="editedName" :max="32" :wrong="!editedName && validate"
                      placeholder="Например, Иван">Новое имя
          </LazyInputField>
          <LazyButton class="w-full" type="submit">
            Сохранить
          </LazyButton>
        </form>
      </LazyModal>
      <span class="text-[20px] text-subtitle">
        Имя профиля
      </span>
      <div class="flex gap-2">
        <h2 class="text-[32px] break-all">{{ profile.name }}</h2>
        <StarIcon class="min-w-8 max-w-8 aspect-square my-auto text-subtitle" @mouseenter="showPrestigeContext=true"
                  @mouseleave="showPrestigeContext=false"></StarIcon>
        <TransitionContext>
          <LazyCardSecondary v-if="showPrestigeContext" class="absolute flex p-4 translate-y-full pointer-events-none">
            <p v-if="prestigeLevel===0">
              Уровень престижа. Повысить данное значение можно после достижения 5ого уровня опыта
            </p>
            <span v-else>Ваш уровень престижа</span>
          </LazyCardSecondary>
        </TransitionContext>
        <span class="text-[24px] my-auto text-subtitle">{{ prestigeLevel }}</span>
        <PencilSquareIcon class="min-w-8 max-w-8 aspect-square ml-auto my-auto cursor-pointer"
                          @click="toggleEdit"></PencilSquareIcon>
      </div>
    </div>
    <div class="flex gap-2">
      <FireIcon class="min-w-8 max-w-8 aspect-square text-subtitle my-auto" @click="toggleEdit"/>
      <span class="text-[24px] text-subtitle"> {{ profile.experience }}</span>
      <LazyCardSecondary class="w-full rounded-full h-8 overflow-hidden">
        <Card :style="{
        width: `${((getTargetForLevel(getLevel) - getDeltaExperience) / getTargetForLevel(getLevel))*100}%`
      }" class="h-full rounded-none"></Card>
      </LazyCardSecondary>
    </div>
    <div class="flex max-lg:flex-col gap-2 justify-between">
      <h2 class="text-[24px]" @click="profile.experience += 20000">Уровень: <b>{{ getLevel }}</b></h2>
      <div class="flex gap-2 lg:gap-8 max-lg:flex-col">
        <h3 class="text-[20px] my-auto text-subtitle">Опыта для следующего уровня:
          <b>{{ getDeltaExperience }}</b></h3>
        <LazyNuxtLink to="/statistics" class="my-auto">
          <h3 class="text-[20px] my-auto text-subtitle flex gap-2">Статистика<ArrowTopRightOnSquareIcon class="min-w-6 max-w-6 aspect-square my-auto"></ArrowTopRightOnSquareIcon></h3>
        </LazyNuxtLink>
      </div>

    </div>

    <div :class="prestigeLevel > 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'" class="grid gap-2 max-lg:grid-cols-1">
      <LazyCardSecondary class="p-6 flex flex-col gap-2">
        <LazyModal v-model:active="editingTarget">
          <LazyRegisterTarget v-model:profile="profile" @next="closeTargetModal"></LazyRegisterTarget>
        </LazyModal>
        <h1 class="text-[32px] lg:text-[32px] font-bold">Цель тренировок</h1>
        <span class="text-[20px] lg:text-[24px]">Текущая цель тренировок </span>
        <span
            class="text-[20px] lg:text-[24px] bg-clip-text text-transparent bg-linear-to-br from-accent via-accent-tinted to-accent">{{ getNameForGoal(profile.trainingGoal) }}</span>
        <span
            class="text-[20px] lg:text-[24px] text-accent-dark hover:text-accent-tinted cursor-pointer transition duration-300 mt-auto"
            @click="editingTarget=true">Сменить</span>
      </LazyCardSecondary>
      <LazyCardSecondary class="p-6 flex flex-col gap-2">
        <h1 class="text-[32px] lg:text-[32px] font-bold">Достижения</h1>
        <p class="text-[20px] lg:text-[24px]">Вы получили <b class="text-accent-tinted">{{ achievements.length }}</b>
          {{ achievementsWord }} </p>
        <span
            class="text-[20px] lg:text-[24px] text-accent-dark hover:text-accent-tinted cursor-pointer transition duration-300 mt-auto"
            @click="routeToAchievementList">Просмотреть список</span>
      </LazyCardSecondary>
      <LazyCardSecondary v-if="prestigeLevel > 0" class="p-6 flex flex-col gap-2">
        <h1 class="text-[32px] lg:text-[32px] font-bold">Престиж</h1>
        <p class="text-[20px] lg:text-[24px]">Ваш уровень престижа составляет <b
            class="text-accent-tinted">{{ prestigeLevel }}</b></p>
      </LazyCardSecondary>
    </div>

    <TransitionDisappear>
      <LazyProfileSlidesPrestige v-if="showPrestigeTransition" :new-prestige="newPrestige" :old-prestige="oldPrestige"
                             class="fixed w-screen h-screen"></LazyProfileSlidesPrestige>
    </TransitionDisappear>

    <div
        v-if="getLevel >= 5"
        class="border rounded-3xl border-subtitle bg-linear-to-br from-accent via-accent-tinted to-accent p-6 flex flex-col gap-2">

      <LazyModal v-model:active="prestigeModal">
        <h1 class="text-[24px] lg:text-[32px] font-medium break-all">Вы уверены?</h1>
        <h2 class="text-subtitle text-[20px] lg:text-[24px]">Ваши достижения и опыт будут обнулены. Это действие нельзя
          отменить</h2>
        <div
            class="flex w-full text-[20px] lg:text-[24px] lg:flex-row-reverse lg:justify-between max-lg:flex-col gap-2 mt-2">
          <LazyButton class="w-fit max-lg:w-full" @click="prestigeAction">Да</LazyButton>
          <span class="my-auto cursor-pointer max-lg:w-full text-center" @click="prestigeModal=false">Отменить</span>
        </div>
      </LazyModal>
      <h1 class="text-[32px]  font-bold">Престиж</h1>
      <p class="text-[20px] lg:text-[24px] ">Вам, как обладателю уровня выше 5 доступен Престиж. Вы можете сбросить ваш
        опыт и достижения, а ваш уровень престижа в профиле будет повышаться, показывая насколько вы продвинутый
        пользователь</p>
      <LazyButton class="ml-auto text-[24px] bg-accent-dark rounded-3xl" @click="prestigeModal=true">Престиж</LazyButton>
    </div>

  </main>
</template>

<style scoped>

</style>