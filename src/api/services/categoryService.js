import axiosClient from '../axiosClient';
import { demoGet } from '../../data/demoDb';

const isProd = import.meta.env.PROD;

export const categoryService = {
  getAll: () =>
    isProd
      ? demoGet('categories')
      : axiosClient.get('/categories').then((r) => r.data),

  getById: (id) =>
    isProd
      ? demoGet('categories', { id })
      : axiosClient.get(`/categories/${id}`).then((r) => r.data),
};
