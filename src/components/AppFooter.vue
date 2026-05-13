<template>
  <ion-footer class="app-footer">
    <ion-toolbar>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="3">
            <h4>About</h4>
            <p>Ionic Videos App - Share your multimedia content with the world.</p>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="3">
            <h4>Features</h4>
            <ul>
              <li>Upload Videos & Photos</li>
              <li>User Profiles</li>
              <li>Community</li>
            </ul>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="3">
            <h4>Quick Links</h4>
            <ul>
              <li><router-link to="/home">Home</router-link></li>
              <li><router-link to="/login">Login</router-link></li>
              <li><router-link to="/register">Register</router-link></li>
            </ul>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="3">
            <h4>Contact</h4>
            <p>Email: info@ionicvideos.app</p>
            <p>© 2026 Ionic Videos App Pablo</p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
import { IonFooter, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/vue';
</script>

<style scoped>
.app-footer {
  margin-top: 40px;
  border-top: 1px solid var(--ion-border-color);
}

.app-footer ion-toolbar {
  padding: 20px 0;
}

.app-footer h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 10px 0;
}

.app-footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.app-footer ul li {
  margin: 5px 0;
}

.app-footer a {
  color: var(--ion-color-primary);
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}

.app-footer p {
  margin: 5px 0;
  font-size: 0.95rem;
  color: var(--ion-text-color-secondary);
}

@media (max-width: 768px) {
  .app-footer h4 {
    margin-top: 20px;
  }
}
</style>

