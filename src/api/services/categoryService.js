import axiosClient from '../axiosClient';

export const categoryService = {
  getAll: () => axiosClient.get('/categories').then((r) => r.data),
  getById: (id) => axiosClient.get(`/categories/${id}`).then((r) => r.data),
};
