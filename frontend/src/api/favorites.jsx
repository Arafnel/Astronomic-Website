import apiClient from './client.jsx';

export const favoritesAPI = {
  getFavorites: () => apiClient.get('/favorites/'),
  addToFavorites: (objectId) => apiClient.post(`/favorites/${objectId}`),
  removeFromFavorites: (objectId) => apiClient.delete(`/favorites/${objectId}`),
};