<script lang="ts" setup>

import {TrainingSlideExperience, TrainingSlideGreeting, TrainingSlideLevel} from "#components";

const props = defineProps({
  expGained: {
    type: Number,
    required: true,
    default: 0
  },
  previousLevel: {
    type: Number,
    required: true,
    default: 0
  },
  currentLevel: {
    type: Number,
    required: true,
    default: 0
  },
  time: {
    type: Number,
    required: true,
    default: 0
  }
})

const {profile} = useProfileStore()

const currentState = defineModel<boolean>('active', {default: false})

const currentSlide = ref<number>(0);

const slides = ref<Component[]>([
  TrainingSlideGreeting,
  TrainingSlideExperience,
  TrainingSlideLevel
])

const router = useRouter()

const next = () => {
  if (currentSlide.value == slides.value.length - 2) {
    if (props.currentLevel === props.previousLevel) {
      router.push('/workout/history')
      return;
    }
  }
  if (currentSlide.value >= slides.value.length - 1) {
    router.push('/workout/history')
    return;
  }
  currentSlide.value++;
}

</script>

<template>
  <TransitionDisappear>
    <ModalContainer v-if="currentState" class="backdrop-brightness-50">
      <TransitionCycle>
        <div :key="currentSlide" class="fixed flex w-[100vw] h-[100vh] overflow-y-scroll oveflow-x-hidden">
          <div class="m-auto w-fit">
            <component :is="slides[currentSlide]" :current-exp="profile.experience"
                       :current-level="currentLevel"
                       :previous-exp="profile.experience - expGained"
                       :previous-level="previousLevel"
                       :time="time"
                       lazy="true"
                       @next="next"
            ></component>
          </div>
        </div>
      </TransitionCycle>
    </ModalContainer>
  </TransitionDisappear>
</template>

<style scoped>

</style>