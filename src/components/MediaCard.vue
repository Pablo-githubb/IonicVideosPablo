<template>
  <ion-card>
    <img v-if="media.type === 'photo'" :src="media.url" :alt="media.title" style="height: 200px; object-fit: cover; width: 100%;" />
    <video v-else-if="media.type === 'video'" :src="media.url" controls style="height: 200px; width: 100%; object-fit: cover;"></video>
    
    <ion-card-header>
      <ion-card-title>{{ media.title }}</ion-card-title>
      <ion-card-subtitle>{{ media.type.toUpperCase() }} - {{(media.size / 1024 / 1024).toFixed(2)}} MB</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <p>{{ media.description }}</p>
    </ion-card-content>

    <ion-button v-if="editable" expand="full" color="secondary" @click="$emit('edit', media.id)">Edit</ion-button>
    <ion-button v-if="editable" expand="full" color="danger" @click="$emit('delete', media.id)">Delete</ion-button>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/vue';
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
</script>
