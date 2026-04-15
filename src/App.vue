<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useAuthStore } from './stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
  if (authStore.isAuthenticated) {
    authStore.fetchUser();
  }
});
</script>

<style>
/* Basic styles */
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
