<script lang="ts" setup>

import {useNotifications} from "~/stores/notifications.store";

const {currentNotifications} = storeToRefs(useNotifications())

const getLastItem = computed(() => {
  return currentNotifications.value[currentNotifications.value.length - 1];
})

</script>

<template>

  <div class="fixed right-0 top-0 w-full lg:w-1/2 xl:w-1/3 pointer-events-none h-screen z-30 p-4 flex flex-col">
    <TransitionGroup name="list-items">
      <div v-for="item in currentNotifications" :key="item.time"
           class="backdrop-blur-xl rounded-3xl mt-2 max-lg:hidden">
        <NotificationsCard :message="item.message" :time="item.time" :title="item.title"
                           :type="item.type"></NotificationsCard>
      </div>
      <div
          v-if="currentNotifications.length > 0"
          :key="getLastItem.time"
          class="backdrop-blur-xl rounded-3xl mt-2 lg:hidden">
        <NotificationsCard
            :message="getLastItem.message"
            :time="getLastItem.time"
            :title="getLastItem.title"
            :type="getLastItem.type"
        ></NotificationsCard>
      </div>

    </TransitionGroup>
  </div>

</template>

<style scoped>

.list-items-enter-active, .list-items-leave-active {
  transition: 500ms;
}

.list-items-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}

.list-items-enter-to, .list-items-leave-from {
  pointer-events: none;
  opacity: 100%;
  transform: translateY(0rem);
  max-height: calc(15%);

}

.list-items-leave-to {
  pointer-events: none;
  opacity: 0;
  filter: blur(2rem);
  margin: 0;
  max-height: calc(0%);
}
</style>