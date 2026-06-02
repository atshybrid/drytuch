import axiosClient from '../axiosClient';

export const miscService = {
  getBanners: () => axiosClient.get('/banners').then((r) => r.data),
  getOffers: () => axiosClient.get('/offers').then((r) => r.data),
  getNotifications: (userId) =>
    axiosClient
      .get('/notifications', { params: { userId } })
      .then((r) => r.data),
  getAddresses: (userId) =>
    axiosClient
      .get('/addresses', { params: { userId } })
      .then((r) => r.data),
  createAddress: (address) =>
    axiosClient.post('/addresses', address).then((r) => r.data),
  updateAddress: (id, data) =>
    axiosClient.patch(`/addresses/${id}`, data).then((r) => r.data),
};
