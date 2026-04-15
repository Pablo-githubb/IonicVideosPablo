import api from './api';

export default {
  async register(data: any) {
    const response = await api.post('/register', data);
    return response.data;
  },

  async login(data: any) {
    const response = await api.post('/login', data);
    return response.data;
  },

  async logout() {
    const response = await api.post('/logout');
    return response.data;
  },

  async getUser() {
    const response = await api.get('/user');
    return response.data;
  }
};
