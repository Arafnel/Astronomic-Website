import apiClient from './client.jsx';

export const eventsAPI = {
  getEvents: (params) => apiClient.get('/events/', { params }),
  getEvent: (id) => apiClient.get(`/events/${id}`),
  createEvent: (data) => apiClient.post('/events/', data),
  updateEvent: (id, data) => apiClient.put(`/events/${id}`, data),
  deleteEvent: (id) => apiClient.delete(`/events/${id}`),
};