import axiosClient from '../axiosClient';
import { demoGet } from '../../data/demoDb';

const isProd = import.meta.env.PROD;

export const reviewService = {
  getByProduct: (productId) =>
    isProd
      ? demoGet('reviews', { params: { productId } })
      : axiosClient
          .get('/reviews', { params: { productId } })
          .then((r) => r.data),
};
