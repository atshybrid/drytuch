import axiosClient from '../axiosClient';
import { demoGet } from '../../data/demoDb';

const isProd = import.meta.env.PROD;

export const orderService = {
  getByUser: (userId) =>
    isProd
      ? demoGet('orders', { params: { userId } })
      : axiosClient
          .get('/orders', { params: { userId } })
          .then((r) => r.data),

  getById: (id) =>
    isProd
      ? demoGet('orders', { id })
      : axiosClient.get(`/orders/${id}`).then((r) => r.data),

  create: (order) =>
    isProd
      ? Promise.resolve({ ...order, id: String(Date.now()) })
      : axiosClient.post('/orders', order).then((r) => r.data),

  update: (id, data) =>
    isProd
      ? Promise.resolve({ id, ...data })
      : axiosClient.patch(`/orders/${id}`, data).then((r) => r.data),
};
