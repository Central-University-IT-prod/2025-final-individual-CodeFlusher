<script lang="ts" setup>

import type {ExerciseDifficulty} from "~/types/exercise.type";
import {getStringByDifficulty, getStyleByDifficulty} from "~/scripts/utils";

const difficultyLevel = defineModel<ExerciseDifficulty>('difficulty', {default: 0 as ExerciseDifficulty});

</script>

<template>

  <label class="text-[24px]" for="categories">Сложность упражнения</label>

  <CardSecondary id="categories" class="p-6 mt-[-1rem]">
    <NavigationTab>
      <template v-slot:button>
        <h4 :class="getStyleByDifficulty(difficultyLevel)" class="my-auto">
          {{ getStringByDifficulty(difficultyLevel) }}</h4>
      </template>
      <template v-slot:options>
        <NavigationWrapper>
          <NavigationContainer>
            <NavigationButton @click="difficultyLevel=0 as ExerciseDifficulty">Простая</NavigationButton>
            <NavigationButton @click="difficultyLevel=1 as ExerciseDifficulty">Средняя</NavigationButton>
            <NavigationButton @click="difficultyLevel=2 as ExerciseDifficulty">Сложная</NavigationButton>
          </NavigationContainer>
        </NavigationWrapper>
      </template>
    </NavigationTab>
  </CardSecondary>

</template>

<style scoped>

</style>