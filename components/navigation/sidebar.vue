<script lang="ts" setup>

const active = defineModel<boolean>('active', {default: false})

const props = defineProps({
  paddingTop: {
    type: Number,
    default: 0
  }
})

</script>

<template>
  <nav
      :class="active ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'"
      :style="{
    paddingTop: `${paddingTop}px`,
  }"
      class="lg:hidden fixed top-0 left-0 bg-primary w-screen h-screen flex flex-col gap-4 p-8 origin-top-left -z-10 transition duration-400">
    <h1 class="text-[24px] font-bold">Путеводитель</h1>
    <section>
      <h1 class="text-[20px] font-medium">Упражнения</h1>
      <div class="flex gap-2 flex-col p-2 text-subtitle ">
        <LazyNuxtLink class="text-[16px] " to="/exercise/list" @click="active=false"> Все упражнения</LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/exercise/group/list" @click="active=false"> Группы упражнений
        </LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/exercise/group/new" @click="active=false"> Создать новую группу
        </LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/exercise/new" @click="active=false"> Создать новое упражнение
        </LazyNuxtLink>
      </div>
    </section>
    <section>
      <h1 class="text-[20px] font-medium">Тренировки</h1>
      <div class="flex gap-2 flex-col p-2 text-subtitle">
        <LazyNuxtLink class="text-[16px]" to="/workout/list" @click="active=false">
          Все тренировки
        </LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/workout/group/list" @click="active=false">
          Группы тренировок
        </LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/workout/group/new" @click="active=false">
          Создать новую группу
        </LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/workout/new" @click="active=false">
          Создать новую тренировку
        </LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/workout/history" @click="active=false">
          История тренировок
        </LazyNuxtLink>
      </div>
    </section>
    <section>
      <h1 class="text-[20px] font-medium">Спортинвентарь</h1>
      <div class="flex gap-2 flex-col p-2 text-subtitle">
        <LazyNuxtLink class="text-[16px]" to="/inventory/list" @click="active=false"> Весь спортинвентарь</LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/inventory/new" @click="active=false"> Добавить спортинвентарь
        </LazyNuxtLink>
      </div>
    </section>
    <section>
      <h1 class="text-[20px] font-medium">Профиль</h1>
      <div class="flex gap-2 flex-col p-2 text-subtitle">
        <LazyNuxtLink class="text-[16px]" to="/profile" @click="active=false"> Профиль</LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/achievements" @click="active=false"> Список Достижений </LazyNuxtLink>
        <LazyNuxtLink class="text-[16px]" to="/statistics" @click="active=false"> Статистика </LazyNuxtLink>
      </div>
    </section>
  </nav>

</template>

<style scoped>

</style>