<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <h1 class="text-2xl font-bold mb-4">My Dashboard</h1>
      <p class="mb-6">Manage your uploaded photos and videos.</p>

      <div v-if="loading" style="text-align: center; margin-top: 50px;">
        <ion-spinner></ion-spinner>
      </div>

      <div v-else class="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
        <MediaCard 
          v-for="item in mediaItems" 
          :key="item.id" 
          :media="item" 
          :editable="true"
          @delete="handleDelete"
        />
      </div>

      <div v-if="mediaItems.length === 0 && !loading" style="text-align: center; margin-top: 50px; color: gray;">
        You haven't uploaded anything yet.
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

const loadData = async () => {
  loading.value = true;
  try {
    const response = await multimediaService.getMyMultimedia();
    mediaItems.value = response.data || response; // depending on if it's paginated
  } catch (e) {
    console.error("Failed to load user media:", e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});

const handleDelete = async (id: number) => {
  if (confirm("Are you sure you want to delete this item?")) {
    try {
      await multimediaService.deleteMedia(id);
      loadData();
    } catch (e) {
      console.error("Failed to delete", e);
    }
  }
};
</script>
