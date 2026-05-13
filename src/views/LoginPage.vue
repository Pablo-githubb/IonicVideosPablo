<template>
  <ion-page>
    <AppNavbar />
    <ion-content class="ion-padding">
      <div class="form-container">
        <h2 class="form-title">Login to your account</h2>

        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input v-model="email" type="email" placeholder="john@example.com"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input v-model="password" type="password" placeholder="••••••••"></ion-input>
        </ion-item>

        <ion-button expand="block" class="submit-btn" @click="handleLogin" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </ion-button>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="signup-link">
          <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
        </div>
      </div>
    </ion-content>
    <AppFooter />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';

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

<style scoped>
.form-container {
  max-width: 400px;
  margin: 50px auto 0;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  color: var(--ion-text-color);
}

.submit-btn {
  margin-top: 30px;
}

.error-message {
  color: var(--ion-color-danger);
  margin-top: 15px;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(255, 68, 68, 0.1);
}

.signup-link {
  text-align: center;
  margin-top: 20px;
  color: var(--ion-text-color-secondary);
}

.signup-link a {
  color: var(--ion-color-primary);
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .form-container {
    margin: 30px auto 0;
  }

  .form-title {
    font-size: 1.2rem;
  }
}
</style>

