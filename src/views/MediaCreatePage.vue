<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <div style="max-width: 600px; margin: 0 auto;">
        <h2 class="text-2xl font-bold mb-4">Upload New Media</h2>

        <ion-item>
          <ion-label position="stacked">Title</ion-label>
          <ion-input v-model="title" placeholder="A great video"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Description</ion-label>
          <ion-textarea v-model="description" placeholder="Write something..."></ion-textarea>
        </ion-item>

        <div style="margin-top: 20px;">
          <file-pond
            name="file"
            ref="pond"
            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
            allow-multiple="false"
            accepted-file-types="video/mp4,video/quicktime,image/jpeg,image/png,image/gif"
            v-on:addfile="handleFileAdd"
            v-on:removefile="handleFileRemove"
          />
        </div>

        <ion-button expand="block" style="margin-top: 20px;" @click="submit" :disabled="loading || !file">
          {{ loading ? 'Uploading...' : 'Save Media' }}
        </ion-button>
        
        <div v-if="error" style="color: var(--ion-color-danger); margin-top: 10px;">
          {{ error }}
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import AppNavbar from '../components/AppNavbar.vue';
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

const handleFileAdd = (error: any, fileItem: any) => {
  if (!error) {
    file.value = fileItem.file;
  }
};

const handleFileRemove = () => {
  file.value = null;
};

const submit = async () => {
  if (!file.value) return;
  loading.value = true;
  error.value = '';

  try {
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('description', description.value);
    formData.append('file', file.value);

    // Determines type based on mime
    const type = file.value.type.startsWith('video/') ? 'video' : 'photo';
    formData.append('type', type);

    await multimediaService.createMedia(formData);
    router.push('/user');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error uploading file';
  } finally {
    loading.value = false;
  }
};
</script>
