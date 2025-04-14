<script lang="ts" setup>

import type {Profile} from "~/types/profile.type";

const profile = defineModel<Profile>('profile', {default: {}})

const emits = defineEmits(['update', 'next'])

const handleSubmit = (event: Event): void => {
  event.preventDefault()
  if (!profile.value.height) {
    return;
  }
  if (!profile.value.weight) {
    return;
  }
  emits('update', profile.value)
  emits('next')
}

</script>

<template>

  <form class="mx-auto" @submit="handleSubmit">
    <InputField v-model:value="profile.weight" :max="550" :min="0" class="w-full lg:w-96" custom-id="weight-input-field"
                placeholder="Ваш вес, указанный в килограммах" type="number"
                @input="$emit('update', profile);">Вес
    </InputField>
    <InputField v-model:value="profile.height" :max="300" :min="0" class="w-full lg:w-96" custom-id="weight-input-field"
                placeholder="Ваш рост, указанный в сантиметрах" type="number"
                @input="$emit('update', profile);">Рост
    </InputField>
    <Button :disabled="profile.weight === 0 || profile.height === 0" class="w-full" type="submit">Продолжить</Button>
  </form>

</template>

<style scoped>

</style>