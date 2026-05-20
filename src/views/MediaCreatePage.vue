<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <div class="form-container">
        <h2 class="form-title">Upload New Media</h2>

        <ion-item>
          <ion-label position="stacked">Title</ion-label>
          <ion-input v-model="title" placeholder="A great video"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Description (optional)</ion-label>
          <ion-textarea v-model="description" placeholder="Write something about your media..."></ion-textarea>
        </ion-item>

        <div class="filepond-container">
          <label class="filepond-label">Select Media File</label>
          <file-pond
            name="file"
            ref="pond"
            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
            allow-multiple="false"
            accepted-file-types="video/mp4,video/quicktime,video/x-msvideo,image/jpeg,image/png,image/gif,video/webm"
            @addfile="handleFileAdd"
            @removefile="handleFileRemove"
            v-on:processfile="handleProcessFile"
          />
        </div>

        <div v-if="file" class="file-info">
          <ion-icon icon="checkmark-circle-outline" color="success"></ion-icon>
          <span>{{ file.name }} ({{ formatFileSize(file.size) }})</span>
        </div>

        <ion-button expand="block" class="submit-btn" color="success" @click="submit" :disabled="loading || !file">
          <ion-icon v-if="!loading" icon="cloud-upload-outline" slot="start"></ion-icon>
          <ion-spinner v-if="loading" slot="start"></ion-spinner>
          {{ loading ? 'Uploading...' : 'Save Media' }}
        </ion-button>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="success" class="success-message">
          {{ success }}
        </div>
      </div>
    </ion-content>
    <AppFooter />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonSpinner } from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import multimediaService from '../services/multimediaService';

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const router = useRouter();
const title = ref('');
const description = ref('');
const file = ref<File | null>(null);
const loading = ref(false);
const error = ref('');
const success = ref('');

const handleFileAdd = (error: any, fileItem: any) => {
  if (!error) {
    file.value = fileItem.file;
  }
};

const handleFileRemove = () => {
  file.value = null;
};

const handleProcessFile = () => {
  // File processed successfully
};

const formatFileSize = (bytes: number): string => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const submit = async () => {
   if (!file.value) return;
   loading.value = true;
   error.value = '';
   success.value = '';

   try {
     const formData = new FormData();
     formData.append('title', title.value);
     formData.append('description', description.value);
     formData.append('file', file.value);

     await multimediaService.createMedia(formData);
     success.value = 'Media uploaded successfully! Redirecting...';
     setTimeout(() => {
       router.push('/user');
     }, 1500);
   } catch (err: any) {
     // Enhanced error handling
     if (err.response?.status === 422) {
       // Validation error
       const errors = err.response.data.errors;
       const errorMessages = Object.values(errors)
         .flat()
         .join(', ');
       error.value = `Validation error: ${errorMessages}`;
     } else if (err.response?.data?.message) {
       error.value = err.response.data.message;
     } else if (err.message === 'Network Error') {
       error.value = 'Network error. Make sure the backend is running at http://localhost:8000';
     } else if (err.message.includes('timeout')) {
       error.value = 'Upload timeout. The file may be too large. Maximum size is 200MB.';
     } else {
       error.value = err.message || 'Error uploading file';
     }
     console.error('Upload error:', err);
   } finally {
     loading.value = false;
   }
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

.filepond-container {
  margin-top: 30px;
  margin-bottom: 20px;
}

.filepond-label {
  display: block;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--ion-text-color);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  margin-top: 15px;
  margin-bottom: 20px;
  color: var(--ion-text-color);
  font-size: 0.95rem;
}

.submit-btn {
  margin-top: 30px;
}

.error-message {
  color: var(--ion-color-danger);
  margin-top: 15px;
  padding: 12px;
  border-radius: 4px;
  background-color: rgba(255, 68, 68, 0.1);
  font-size: 0.95rem;
}

.success-message {
  color: var(--ion-color-success);
  margin-top: 15px;
  padding: 12px;
  border-radius: 4px;
  background-color: rgba(76, 175, 80, 0.1);
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .form-title {
    font-size: 1.4rem;
  }

  .form-container {
    padding: 0;
  }
}
</style>

