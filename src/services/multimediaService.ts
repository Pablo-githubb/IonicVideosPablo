import api from './api';

export default {
  async getMultimedia(params = {}) {
    const response = await api.get('/multimedia', { params });
    return response.data;
  },

  async getMyMultimedia() {
    const response = await api.get('/my-multimedia');
    return response.data;
  },

  async getMediaItem(id: number | string) {
    const response = await api.get(`/multimedia/${id}`);
    return response.data;
  },

  async createMedia(formData: FormData) {
    // Required header for file uploads
    const response = await api.post('/multimedia', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async updateMedia(id: number | string, data: any) {
    const response = await api.put(`/multimedia/${id}`, data);
    return response.data;
  },

  async deleteMedia(id: number | string) {
    const response = await api.delete(`/multimedia/${id}`);
    return response.data;
  }
};
