import apiClient from './client.jsx';

export const objectsAPI = {
  getObjects: (params) => apiClient.get('/objects/', { params }),
  getObject: (id) => apiClient.get(`/objects/${id}`),
  createObject: (data) => apiClient.post('/objects/', data),
  updateObject: (id, data) => apiClient.put(`/objects/${id}`, data),
  deleteObject: (id) => apiClient.delete(`/objects/${id}`),
};