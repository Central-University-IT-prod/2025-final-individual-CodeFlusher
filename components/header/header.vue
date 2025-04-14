<script lang="ts" setup>

import {Bars3Icon, MoonIcon, UserCircleIcon} from "@heroicons/vue/24/outline";
import {useSessionLocalStore} from "~/stores/session.local.store";

const activeStates = ref<Array<Boolean>>([
  false,
  false,
  false
])

const props = defineProps({
  height: {
    type: Number,
    default: 0
  }
})

const replaceEverythingBesides = (index: number) => {
  for (let i = 0; i < activeStates.value.length; i++) {
    if (index !== i) {
      activeStates.value[i] = false;
    }
  }
}

const {getAllGroups} = useExerciseGroupRegistry()
const {getAllWorkoutGroups} = useWorkoutGroupRegistry()
const exerciseGroups = computed(() => {
  return getAllGroups()
})

const workoutGroups = computed(() => {
  return getAllWorkoutGroups()
})
const {toggleDarkMode} = useDarkModeController()

const activeSidebar = ref<boolean>(false)

const activeSessions = computed(() => {
  return useSessionLocalStore.sessions.value;
})

</script>

<template>
  <nav
      id="header"
      class="border-b backdrop-blur-lg px-[32px] lg:px-[128px] py-[32px] flex border-color gap-[32px] ">
    <LazyNuxtLink class="flex gap-2 cursor-pointer max-lg:fixed max-lg:left-1/2 max-lg:-translate-x-1/2" tabindex="1"
                  to="/dashboard"
                  @click="replaceEverythingBesides(-1)">
      <img alt="Logo" class="h-8 aspect-square" src="/icons/strenght.png">
      <h1 class="text-[24px] my-auto font-bold">
        Fit4You
      </h1>
    </LazyNuxtLink>
    <NavigationSidebar v-model:active="activeSidebar" :padding-top="height"/>
    <div class="gap-[32px] flex max-lg:hidden">
      <LazyNavigationTab v-model:active="activeStates[0]" class="my-auto" tabindex="2"
                         @click="replaceEverythingBesides(0)">
        <template v-slot:button>
          Упражнения
        </template>
        <template v-slot:options>
          <LazyNavigationWrapper>
            <LazyNavigationContainer>
              <LazyNavigationOption tabindex="2" to="/exercise/list"> Все упражнения</LazyNavigationOption>
              <LazyNavigationOption v-for="item in exerciseGroups" :to="`/exercise/list#${item.id}`" tabindex="2">
                {{ item.name }}
              </LazyNavigationOption>
            </LazyNavigationContainer>

            <LazyNavigationContainer delay="100ms">
              <LazyNavigationOption tabindex="2" to="/exercise/group/list"> Группы упражнений</LazyNavigationOption>
              <LazyNavigationOption tabindex="2" to="/exercise/group/new"> Создать новую группу</LazyNavigationOption>
            </LazyNavigationContainer>

            <LazyNavigationContainer delay="200ms">
              <LazyNavigationOption tabindex="2" to="/exercise/new"> Создать новое упражнение</LazyNavigationOption>
            </LazyNavigationContainer>
          </LazyNavigationWrapper>
        </template>
      </LazyNavigationTab>
      <LazyNavigationTab v-model:active="activeStates[1]" class="my-auto" tabindex="3"
                         @click="replaceEverythingBesides(1)">
        <template v-slot:button>
          Тренировки
        </template>
        <template v-slot:options>
          <LazyNavigationWrapper>
            <LazyNavigationContainer>
              <LazyNavigationOption tabindex="3" to="/workout/list"> Все тренировки</LazyNavigationOption>
              <LazyNavigationOption v-for="workout in workoutGroups" :to="`/workout/list#${workout.id}`" tabindex="3">
                {{ workout.name }}
              </LazyNavigationOption>
            </LazyNavigationContainer>

            <LazyNavigationContainer delay="100ms">
              <LazyNavigationOption tabindex="3" to="/workout/group/list">Группы тренировок</LazyNavigationOption>
              <LazyNavigationOption tabindex="3" to="/workout/group/new">Создать новую группу тренировок
              </LazyNavigationOption>
            </LazyNavigationContainer>

            <LazyNavigationContainer delay="200ms">
              <LazyNavigationOption tabindex="3" to="/workout/new"> Создать новую тренировку</LazyNavigationOption>
            </LazyNavigationContainer>

            <LazyNavigationContainer delay="300ms">
              <LazyNavigationOption tabindex="3" to="/workout/history">История тренировок</LazyNavigationOption>
            </LazyNavigationContainer>

            <LazyNavigationContainer v-if="activeSessions.length > 0" delay="400ms">
              <LazyNavigationOption v-for="session in activeSessions" :to="`/workout/session/${session.id}`"
                                    tabindex="3">Сессия
                тренировок от {{ new Date(session.startTime).toUTCString() }}
              </LazyNavigationOption>
            </LazyNavigationContainer>
          </LazyNavigationWrapper>
        </template>
      </LazyNavigationTab>
      <LazyNavigationTab v-model:active="activeStates[2]" class="my-auto" tabindex="4"
                         @click="replaceEverythingBesides(2)">
        <template v-slot:button>
          Спортинвентарь
        </template>
        <template v-slot:options>
          <LazyNavigationWrapper>
            <LazyNavigationContainer>
              <LazyNavigationOption tabindex="4" to="/inventory/list"> Весь спортинвентарь</LazyNavigationOption>
            </LazyNavigationContainer>
            <LazyNavigationContainer delay="100ms">
              <LazyNavigationOption tabindex="4" to="/inventory/new"> Добавить спортинвентарь</LazyNavigationOption>
            </LazyNavigationContainer>
          </LazyNavigationWrapper>
        </template>
      </LazyNavigationTab>
    </div>
    <button class="my-auto lg:hidden" tabindex="7" @click="replaceEverythingBesides(-1); activeSidebar=!activeSidebar">
      <Bars3Icon class="size-8">

      </Bars3Icon>
    </button>
    <NuxtLink class="lg:ml-auto cursor-pointermax-lg:w-full flex gap-2  max-lg:hidden" tabindex="5" to="/profile"
              @click="replaceEverythingBesides(-1)">
      <h1 class="text-[24px] max-xl:hidden">
        Профиль
      </h1>
      <UserCircleIcon class="size-8 my-auto"/>
    </NuxtLink>
    <button class="cursor-pointer my-auto max-lg:ml-auto" tabindex="6"
            @click="toggleDarkMode(); replaceEverythingBesides(-1)">
      <MoonIcon class="size-8"
      ></MoonIcon>
    </button>

  </nav>
</template>