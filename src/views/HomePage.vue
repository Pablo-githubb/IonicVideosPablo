<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <h1 class="text-2xl font-bold mb-4">Welcome to Ionic Videos App</h1>
      <p class="mb-6">Explore the latest multimedia content created by out users.</p>

      <div v-if="loading" style="text-align: center; margin-top: 50px;">
        <ion-spinner></ion-spinner>
      </div>

      <div v-else class="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
        <MediaCard v-for="item in mediaItems" :key="item.id" :media="item" />
      </div>

      <div v-if="mediaItems.length === 0 && !loading" style="text-align: center; margin-top: 50px; color: gray;">
        No multimedia content available right now.
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonSpinner } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import AppNavbar from '../components/AppNavbar.vue';
import MediaCard from '../components/MediaCard.vue';
import multimediaService from '../services/multimediaService';

const mediaItems = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    // get paginated results
    const response = await multimediaService.getMultimedia();
    mediaItems.value = response.data; // assume API returns { data: [...] } for pagination
  } catch (e) {
    console.error("Failed to load media items:", e);
  } finally {
    loading.value = false;
  }
});
</script>
