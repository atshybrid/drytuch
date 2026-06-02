import axiosClient from '../axiosClient';
import { demoGet } from '../../data/demoDb';

const isProd = import.meta.env.PROD;

export const miscService = {
  getBanners: () =>
    isProd ? demoGet('banners') : axiosClient.get('/banners').then((r) => r.data),

  getOffers: () =>
    isProd ? demoGet('offers') : axiosClient.get('/offers').then((r) => r.data),

  getNotifications: (userId) =>
    isProd
      ? demoGet('notifications', { params: { userId } })
      : axiosClient
          .get('/notifications', { params: { userId } })
          .then((r) => r.data),

  getAddresses: (userId) =>
    isProd
      ? demoGet('addresses', { params: { userId } })
      : axiosClient
          .get('/addresses', { params: { userId } })
          .then((r) => r.data),

  createAddress: (address) =>
    isProd
      ? Promise.resolve({ ...address, id: String(Date.now()) })
      : axiosClient.post('/addresses', address).then((r) => r.data),

  updateAddress: (id, data) =>
    isProd
      ? Promise.resolve({ id, ...data })
      : axiosClient.patch(`/addresses/${id}`, data).then((r) => r.data),
};
