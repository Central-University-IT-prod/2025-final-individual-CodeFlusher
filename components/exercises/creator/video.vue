<script lang="ts" setup>

import {
  dispatchErrorNotification,
  dispatchInfoNotification,
  dispatchSuccessNotification
} from "~/scripts/notification.utils";

const url = defineModel<string>('url', {default: ''});

const modalState = ref<boolean>(false);

const editedUrl = ref<string>('');

const submitUrl = (e: Event) => {
  e.preventDefault();
  const videoId = editedUrl.value.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

  if (videoId && videoId[1]) {
    url.value = `https://www.youtube.com/embed/${videoId[1]}`;
    dispatchSuccessNotification("Замена ссылки", "Видео успешно заменено")
    modalState.value = false;
    return;
  }
  modalState.value = false;
  dispatchErrorNotification("Замена ссылки", "Не удалось заменить видео - ссылка не является действительной ссылкой на видео в YouTube")
}

const removeVideo = (event: Event) => {
  event.preventDefault();
  url.value = ''
  modalState.value = false;
  dispatchInfoNotification("Замена ссылки", "Видео успешно убрано")
}

</script>

<template>

  <div class="flex flex-col gap-2">

    <Modal v-model:active="modalState">
      <form class="flex flex-col gap-2" @reset="removeVideo" @submit="submitUrl">
        <h1 class="text-[32px]">Изменение видeо</h1>
        <InputField v-model:value="editedUrl" placeholder="Вставьте ссылку">Ссылка на видео</InputField>
        <Button class="w-full" type="submit"> Подтвердить видео</Button>
        <Button v-if="url" class="w-full" destructive type="reset"> Удалить видео</Button>
        <span class="mx-auto text-subtitle text-[24px] cursor-pointer" @click="modalState=false"> Отменить </span>
      </form>
    </Modal>

    <label class="text-[24px]" for="video_button">Назначенное видео</label>
    <Button @click="modalState=true; editedUrl=''">
      {{ url ? 'Заменить видео' : 'Видео-инструкция не назначена. Нажмите для добавления' }}
    </Button>

    <label v-if="url" class="text-[24px]" for="video_button">Текущее видео</label>
    <IframeVideo v-if="url" :url="url"></IframeVideo>
  </div>


</template>

<style scoped>

</style>