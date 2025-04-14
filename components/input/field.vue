<script lang="ts" setup>

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
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
  disableValidation: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number,
    default: 240,
  },
  min: {
    type: Number,
    default: 0,
  },
  customId: {
    type: String,
    default: ''
  }
})

const value = defineModel('value')

const emits = defineEmits(['update'])

</script>

<template>
  <div :class="disableValidation ? '' : 'mb-4'" class="flex flex-col w-full">
    <div class="h-fit w-full">
      <label class=" h-fit flex flex-col">
        <span :class="disabled ? 'opacity-0' : 'opacity-40'" class="text-xl font-semibold">
          <slot></slot>
        </span>
        <input :id="customId" v-model="value" :class="[
        wrong ? 'border-destructive active:border-destructive' : ' border-black/20 dark:border-white/10 focus:border-accent',
        disabled ? 'border-transparent dark:border-transparent ' : '',
        'px-4 rounded-xl py-2 border transition duration-200 w-full outline-none'
    ].join(' ')" :disabled="disabled" :max="max" :maxlength="max" :min="min" :placeholder="placeholder"
               :type="type"
               @input="$emit('update', value)"/>
      </label>
    </div>
    <div v-if="!disableValidation" class="translate-y-full">
      <TransitionContext>
        <span v-if="wrong" class="absolute text-destructive"> {{ wrongText }}</span>
      </TransitionContext>
    </div>

  </div>

</template>

<style scoped>

</style>