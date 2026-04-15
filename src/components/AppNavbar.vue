<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-button router-link="/">Home</ion-button>
      </ion-buttons>
      <ion-title>Ionic Videos App</ion-title>
      <ion-buttons slot="end">
        <template v-if="authStore.isAuthenticated">
          <ion-button router-link="/media/create">Upload</ion-button>
          <ion-button router-link="/user">My Panel</ion-button>
          <ion-button @click="handleLogout">Logout</ion-button>
        </template>
        <template v-else>
          <ion-button router-link="/login">Login</ion-button>
          <ion-button router-link="/register">Register</ion-button>
        </template>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>
