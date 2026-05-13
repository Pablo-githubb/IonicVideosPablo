<template>
  <ion-card class="media-card">
    <div class="media-container">
      <img v-if="media.type === 'photo'" :src="media.url" :alt="media.title" class="media-image" />
      <video v-else-if="media.type === 'video'" :src="media.url" controls class="media-video"></video>
    </div>

    <ion-card-header>
      <ion-card-title class="media-title">{{ media.title }}</ion-card-title>
      <ion-card-subtitle class="media-subtitle">
        {{ media.type.toUpperCase() }} • {{ formatFileSize(media.size) }}
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <p class="media-description">{{ media.description || 'No description' }}</p>
    </ion-card-content>

    <div class="card-actions" v-if="editable">
      <ion-button expand="block" color="primary" size="small" @click="$emit('edit', media.id)">
        <ion-icon icon="pencil-outline" slot="start"></ion-icon>
        Edit
      </ion-button>
      <ion-button expand="block" color="danger" size="small" @click="$emit('delete', media.id)">
        <ion-icon icon="trash-outline" slot="start"></ion-icon>
        Delete
      </ion-button>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon } from '@ionic/vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
  media: {
    type: Object,
    required: true
  },
  editable: {
    type: Boolean,
    default: false
  }
});

defineEmits(['edit', 'delete']);

const formatFileSize = (bytes: number): string => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
</script>

<style scoped>
.media-card {
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.media-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.media-container {
  width: 100%;
  height: 200px;
  background: var(--ion-color-light);
  position: relative;
  overflow: hidden;
}

.media-image,
.media-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 10px 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-subtitle {
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.5);
}

.media-description {
  font-size: 0.95rem;
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-actions {
  display: flex;
  gap: 8px;
  padding: 8px 16px 16px;
}

.card-actions ion-button {
  flex: 1;
}

@media (max-width: 640px) {
  .media-container {
    height: 180px;
  }

  .media-title {
    font-size: 1rem;
  }
}
</style>

