<script lang="ts" setup>

const descriptionModel = defineModel<String[]>('long', {default: ['']})

const props = defineProps({
  validate: {
    type: Boolean,
    default: false
  }
})

const processInput = (inputEvent: InputEvent, index: number) => {
  if (index === descriptionModel.value.length - 1) {
    if (descriptionModel.value[index].length > 0) {
      descriptionModel.value.push('')
    }
  }
  const rFindIndex = descriptionModel.value.findLastIndex((item: String) => !!item)
  if (rFindIndex === -1) {
    descriptionModel.value = ['']
    return;
  }
  if (rFindIndex < descriptionModel.value.length - 2) {
    descriptionModel.value = descriptionModel.value.splice(0, rFindIndex + 2)
  }
}

const updateValue = (val: String, index: number) => {
  descriptionModel.value[index] = val;
}

</script>

<template>

  <div>
    <label class="text-[24px]" for="descriptionLong">Пошаговая инструкция</label>

    <div id="descriptionLong" class="mt-2 flex flex-col gap-2">
      <div v-for="(item, index) in descriptionModel" class="flex w-full gap-2">
        <span class="text-[20px] my-auto">{{ index + 1 }}.</span>
        <InputField
            :placeholder="index === 0 ? 'Инструкция. Хотя бы одно поле должно иметь текст' : 'Инструкция к упражнению'"
            :value="item"
            :wrong="validate && descriptionModel.length === 1 && !item" class="w-full"
            @input="(event: InputEvent) => processInput(event, index)"
            @update="(val: string) => updateValue(val, index)"></InputField>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>