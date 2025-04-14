<script lang="ts" setup>

const props = defineProps({
  allowCloseOnOutOfBoundsClick: {
    type: Boolean,
    default: true
  },
});

const active = defineModel('active')

const containerId = 'modal-container';

const handleClick = (event: MouseEvent) => {
  if (!event.target) {
    return
  }
  if (props.allowCloseOnOutOfBoundsClick) {
    if (event.target.id === containerId) {
      active.value = false;
    }
  }
}

</script>

<template>
  <TransitionDisappear>
    <ModalContainer v-if="active" :id="containerId" @click="handleClick">
      <TransitionContext>
        <Card v-if="active" class="w-fit m-auto flex flex-col p-6 lg:p-12 lg:w-[60%] max-h-[100vh] overflow-y-auto"
              primary>
          <slot></slot>
        </Card>
      </TransitionContext>
    </ModalContainer>
  </TransitionDisappear>
</template>

<style scoped>

</style>