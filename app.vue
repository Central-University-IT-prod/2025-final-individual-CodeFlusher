<template>
  <NuxtLoadingIndicator :height="2" color="#16FEAD"></NuxtLoadingIndicator>

  <NotificationsBar></NotificationsBar>

  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>

  <Footer tabindex="-1"></Footer>

</template>
<script lang="ts" setup>
import {setupDarkMode} from "~/scripts/darkmode";

const {isFinishedRegister} = useProfileStore()

const router = useRouter()

const route = useRoute()

if (!isFinishedRegister) {
  router.push('/')
}

if (route.path === '/' && isFinishedRegister) {
  router.push('/dashboard')
}

setupDarkMode()
useHead({
  titleTemplate: (title) => {
    return title ? `Fit4You - ${title}` : 'Fit4You';
  }
})
</script>