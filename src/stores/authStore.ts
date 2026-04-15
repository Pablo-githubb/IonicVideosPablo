import { defineStore } from 'pinia';
import authService from '../services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null,
    token: localStorage.getItem('auth_token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('auth_token', token);
    },
    clearAuth() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
    },
    async login(credentials: any) {
      const response = await authService.login(credentials);
      if (response.token) {
        this.setToken(response.token);
        this.user = response.user;
      }
      return response;
    },
    async register(data: any) {
      const response = await authService.register(data);
      if (response.token) {
        this.setToken(response.token);
        this.user = response.user;
      }
      return response;
    },
    async logout() {
      try {
        if (this.token) {
          await authService.logout();
        }
      } catch (e) {
        // Ignorem l'err si ja és invalid al servidor
      } finally {
        this.clearAuth();
      }
    },
    async fetchUser() {
      if (!this.token) return;
      try {
        const response = await authService.getUser();
        this.user = response;
      } catch (error) {
        this.clearAuth();
      }
    }
  }
});
