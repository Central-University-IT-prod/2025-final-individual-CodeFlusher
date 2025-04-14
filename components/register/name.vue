<script lang="ts" setup>

import type {Profile} from "~/types/profile.type";

const profile = defineModel<Profile>('profile', {default: {}})

const name = ref<string>('')

const emits = defineEmits(['update', 'next'])

const handleSubmit = (event: Event) => {
  event.preventDefault()
  emits('next')
}

</script>

<template>
  <form class="flex flex-col gap-4 mx-auto" @submit="handleSubmit">
    <InputField v-model:value="profile.name" :max="32" class="w-full lg:w-96" placeholder="Например, 'Егор'"
                @input="$emit('update', profile); name=profile.name">Имя аватара
    </InputField>
    <Button :disabled="!name" class="w-full lg:w-96" type="submit">Продолжить</Button>
  </form>
</template>

<style scoped>

</style>