<script lang="ts" setup>

import {ExerciseAdditionalFieldType} from "~/types/workout.type";
import {getStringByFieldType} from "~/scripts/workout.utils";

const model = defineModel<ExerciseAdditionalFieldType>('field', {default: ExerciseAdditionalFieldType.NONE})

</script>

<template>
  <div>
    <h1 class="text-[24px]">Поля в упражнении</h1>
    <CardSecondary class="p-6">
      <NavigationTab>
        <template #button>
          {{ getStringByFieldType(model) }}
        </template>
        <template #options>
          <NavigationWrapper>
            <NavigationContainer>
              <NavigationButton v-for="item in ExerciseAdditionalFieldType" @click="model = item">
                {{ getStringByFieldType(item) }}
              </NavigationButton>
            </NavigationContainer>
          </NavigationWrapper>
        </template>
      </NavigationTab>
    </CardSecondary>
  </div>

</template>

<style scoped>

</style>