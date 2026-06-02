import axiosClient from '../axiosClient';

export const orderService = {
  getByUser: (userId) =>
    axiosClient
      .get('/orders', { params: { userId } })
      .then((r) => r.data),

  getById: (id) => axiosClient.get(`/orders/${id}`).then((r) => r.data),

  create: (order) =>
    axiosClient.post('/orders', order).then((r) => r.data),

  update: (id, data) =>
    axiosClient.patch(`/orders/${id}`, data).then((r) => r.data),
};
