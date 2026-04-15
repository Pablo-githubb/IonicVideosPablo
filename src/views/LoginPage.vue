<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <div style="max-width: 400px; margin: 0 auto; margin-top: 50px;">
        <h2 class="text-xl font-bold mb-4" style="text-align: center;">Login to your account</h2>
        
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input v-model="email" type="email" placeholder="john@example.com"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input v-model="password" type="password" placeholder="••••••••"></ion-input>
        </ion-item>

        <ion-button expand="block" style="margin-top: 20px;" @click="handleLogin" :disabled="loading">
          {{ loading ? 'Loggin in...' : 'Login' }}
        </ion-button>
        
        <div v-if="error" style="color: var(--ion-color-danger); margin-top: 10px; text-align: center;">
          {{ error }}
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import AppNavbar from '../components/AppNavbar.vue';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/user');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Invalid credentials';
  } finally {
    loading.value = false;
  }
};
</script>
