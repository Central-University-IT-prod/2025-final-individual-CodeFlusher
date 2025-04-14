<script lang="ts" setup>

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  wrong: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  wrongText: {
    type: String,
    default: 'Это поле не должно быть пустым'
  },
  max: {
    type: Number,
    default: 480,
  },
})

const value = defineModel<string>('value')

const emits = defineEmits(['update'])

</script>

<template>
  <div class="mb-4">
    <div>
      <span :class="disabled ? 'opacity-0' : 'opacity-40'" class="text-xl font-semibold "><slot></slot></span>
      <textarea v-model="value" :class="[
        wrong ? 'border-destructive active:border-destructive' : ' border-black/20 dark:border-white/10 focus:border-accent',
        disabled ? 'border-transparent dark:border-transparent ' : '',
        'min-h-[42px]'
    ].join(' ')" :disabled="disabled" :maxlength="max" :placeholder="placeholder"
                class="px-4 rounded-xl py-2 border transition duration-200 w-full outline-none "
                @input="$emit('update', value)"/>
    </div>
    <div class="translate-y-full">
      <TransitionContext>
        <span v-if="wrong" class="absolute text-destructive"> {{ wrongText }}</span>
      </TransitionContext>
    </div>

  </div>


</template>

<style scoped>

</style>