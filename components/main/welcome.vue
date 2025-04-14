<script lang="ts" setup>

</script>

<template>
  <div class="flex flex-col">
    <TransitionContext>
      <div class="flex gap-4 mx-auto">
        <img class="size-12 lg:size-24 my-auto" src="/icons/strenght.png" alt="Logo">
        <h1 class="text-[36px] lg:text-[80px] font-bold ">Fit4You</h1>
      </div>
    </TransitionContext>
    <TransitionContext delay="100ms">
      <h2 class="text-[20px] lg:text-[36px] text-subtitle max-lg:text-center"> Твой личный помощник в спорте!</h2>
    </TransitionContext>
    <TransitionContext delay="200ms">
      <NuxtLink to="/workout/list">
        <Button class="w-full text-[16px] lg:text-[24px]"> Начать первую тренировку!</Button>
      </NuxtLink>

    </TransitionContext>
  </div>
</template>

<style scoped>

</style>