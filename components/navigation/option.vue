<script lang="ts" setup>

const props = defineProps({
  to: {
    type: String,
    default: '/dashboard'
  },
})

</script>

<template>
  <NuxtLink :to="to">
    <NavigationButton>
      <slot></slot>
    </NavigationButton>
  </NuxtLink>
</template>
