<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title class="app-title">📹 Ionic Videos App</ion-title>
      <ion-buttons slot="end">
        <template v-if="authStore.isAuthenticated">
          <ion-button router-link="/home" class="nav-button">
            <ion-icon icon="home-outline" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button router-link="/media/create" class="nav-button">
            <ion-icon icon="cloud-upload-outline" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button router-link="/user" class="nav-button">
            <ion-icon icon="person-circle-outline" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button @click="handleLogout" class="nav-button">
            <ion-icon icon="log-out-outline" slot="icon-only"></ion-icon>
          </ion-button>
        </template>
        <template v-else>
          <ion-button router-link="/login" class="nav-button" fill="outline">
            Login
          </ion-button>
          <ion-button router-link="/register" class="nav-button" fill="outline">
            Register
          </ion-button>
        </template>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/home');
};
</script>

<style scoped>
.app-title {
  font-size: 1.2rem;
  font-weight: 700;
}

.nav-button {
  margin: 0 4px;
}

@media (max-width: 640px) {
  .app-title {
    font-size: 1rem;
  }
}
</style>

