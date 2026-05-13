<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <div class="container">
        <h1 class="title">{{ folderName }}</h1>
        <p class="subtitle">Browse multimedia by category</p>

        <div v-if="loading" style="text-align: center; margin-top: 50px;">
          <ion-spinner></ion-spinner>
        </div>

        <div v-else class="media-grid">
          <MediaCard v-for="item in mediaItems" :key="item.id" :media="item" />
        </div>

        <div v-if="mediaItems.length === 0 && !loading" class="empty-state">
          <p>No content in this folder.</p>
        </div>
      </div>
    </ion-content>
    <AppFooter />
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonContent, IonSpinner } from '@ionic/vue';
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import MediaCard from '../components/MediaCard.vue';

const route = useRoute();
const mediaItems = ref<any[]>([]);
const loading = ref(true);

const folderName = computed(() => {
  const id = route.params.id as string;
  return id.charAt(0).toUpperCase() + id.slice(1);
});

onMounted(() => {
  // Placeholder - in future can filter by category
  loading.value = false;
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--ion-text-color);
}

.subtitle {
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: var(--ion-text-color-secondary);
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  margin-top: 50px;
  color: var(--ion-text-color-secondary);
}

@media (max-width: 640px) {
  .title {
    font-size: 1.5rem;
  }

  .media-grid {
    grid-template-columns: 1fr;
  }
}
</style>
}

#container a {
  text-decoration: none;
}
</style>
