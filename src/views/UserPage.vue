<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <div class="container">
        <h1 class="title">My Dashboard</h1>
        <p class="subtitle">Manage your uploaded photos and videos.</p>

        <ion-button expand="block" color="success" router-link="/media/create" class="upload-btn">
          <ion-icon icon="cloud-upload-outline" slot="start"></ion-icon>
          Upload New Media
        </ion-button>

        <div v-if="loading" style="text-align: center; margin-top: 50px;">
          <ion-spinner></ion-spinner>
        </div>

        <div v-else class="media-grid">
          <MediaCard
            v-for="item in mediaItems"
            :key="item.id"
            :media="item"
            :editable="true"
            @delete="handleDelete"
            @edit="handleEdit"
          />
        </div>

        <div v-if="mediaItems.length === 0 && !loading" class="empty-state">
          <p>You haven't uploaded anything yet.</p>
          <ion-button color="primary" router-link="/media/create">Start Uploading</ion-button>
        </div>
      </div>
    </ion-content>
    <AppFooter />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonSpinner, IonButton, IonIcon } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import MediaCard from '../components/MediaCard.vue';
import multimediaService from '../services/multimediaService';
import { cloudUploadOutline } from 'ionicons/icons';

const mediaItems = ref<any[]>([]);
const loading = ref(true);
const router = useRouter();

const loadData = async () => {
  loading.value = true;
  try {
    const response = await multimediaService.getMyMultimedia();
    mediaItems.value = response.data || response;
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

const handleEdit = (id: number) => {
  router.push(`/media/edit/${id}`);
};
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
  margin-bottom: 20px;
  color: var(--ion-text-color-secondary);
}

.upload-btn {
  margin-bottom: 30px;
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

.empty-state p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .media-grid {
    grid-template-columns: 1fr;
  }
}
</style>

