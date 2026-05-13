<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <div class="form-container">
        <h2 class="form-title">Edit Media</h2>

        <div v-if="loading" style="text-align: center; margin-top: 50px;">
          <ion-spinner></ion-spinner>
        </div>

        <template v-else>
          <ion-item>
            <ion-label position="stacked">Title</ion-label>
            <ion-input v-model="form.title" placeholder="A great video"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Description (optional)</ion-label>
            <ion-textarea v-model="form.description" placeholder="Write something about your media..."></ion-textarea>
          </ion-item>

          <div class="media-preview">
            <h4>Current Media</h4>
            <img v-if="media?.type === 'photo'" :src="media?.url" :alt="media?.title" class="preview-image" />
            <video v-else-if="media?.type === 'video'" :src="media?.url" controls class="preview-video"></video>
          </div>

          <ion-button expand="block" class="submit-btn" color="primary" @click="submit" :disabled="submitting">
            <ion-icon v-if="!submitting" :icon="saveOutline" slot="start"></ion-icon>
            <ion-spinner v-if="submitting" slot="start"></ion-spinner>
            {{ submitting ? 'Saving...' : 'Save Changes' }}
          </ion-button>

          <ion-button expand="block" color="secondary" @click="goBack">
            Cancel
          </ion-button>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="success" class="success-message">
            {{ success }}
          </div>
        </template>
      </div>
    </ion-content>
    <AppFooter />
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonSpinner } from '@ionic/vue';
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import multimediaService from '../services/multimediaService';
import { saveOutline } from 'ionicons/icons';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const submitting = ref(false);
const error = ref('');
const success = ref('');
const media = ref<any>(null);
const form = ref({
  title: '',
  description: ''
});

onMounted(async () => {
  try {
    const id = route.params.id as string;
    const response = await multimediaService.getMediaItem(id);
    media.value = response.data || response;
    form.value = {
      title: media.value.title,
      description: media.value.description || ''
    };
  } catch (err) {
    console.error('Failed to load media:', err);
    error.value = 'Failed to load media';
  } finally {
    loading.value = false;
  }
});

const submit = async () => {
  submitting.value = true;
  error.value = '';
  success.value = '';

  try {
    const id = route.params.id as string;
    await multimediaService.updateMedia(id, {
      title: form.value.title,
      description: form.value.description
    });
    success.value = 'Media updated successfully!';
    setTimeout(() => {
      router.push('/user');
    }, 1500);
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error updating media';
  } finally {
    submitting.value = false;
  }
};

const goBack = () => {
  router.push('/user');
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.form-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--ion-text-color);
}

.media-preview {
  margin: 30px 0;
  padding: 20px;
  background-color: var(--ion-color-light);
  border-radius: 8px;
}

.media-preview h4 {
  margin-top: 0;
  margin-bottom: 15px;
  font-weight: 600;
  color: var(--ion-text-color);
}

.preview-image,
.preview-video {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.submit-btn {
  margin-top: 30px;
  margin-bottom: 10px;
}

.error-message {
  color: var(--ion-color-danger);
  margin-top: 15px;
  padding: 12px;
  border-radius: 4px;
  background-color: rgba(255, 68, 68, 0.1);
}

.success-message {
  color: var(--ion-color-success);
  margin-top: 15px;
  padding: 12px;
  border-radius: 4px;
  background-color: rgba(76, 175, 80, 0.1);
}

@media (max-width: 640px) {
  .form-title {
    font-size: 1.4rem;
  }
}
</style>

