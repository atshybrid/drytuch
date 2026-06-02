import axiosClient from '../axiosClient';
import { demoGet } from '../../data/demoDb';

const HOME_BEST_SELLER_IDS = ['3', '2', '4', '12'];
const isProd = import.meta.env.PROD;

export const productService = {
  getAll: (params = {}) =>
    isProd
      ? demoGet('products', { params })
      : axiosClient.get('/products', { params }).then((r) => r.data),

  getById: (id) =>
    isProd
      ? demoGet('products', { id })
      : axiosClient.get(`/products/${id}`).then((r) => r.data),

  getByCategory: (categoryId) =>
    isProd
      ? demoGet('products', { params: { categoryId } })
      : axiosClient
          .get('/products', { params: { categoryId } })
          .then((r) => r.data),

  getFeatured: () =>
    isProd
      ? demoGet('products', { params: { featured: true } })
      : axiosClient
          .get('/products', { params: { featured: true } })
          .then((r) => r.data.filter((p) => p.featured)),

  getDeals: () =>
    isProd
      ? demoGet('products').then((list) => list.filter((p) => p.deal))
      : axiosClient.get('/products').then((r) => r.data.filter((p) => p.deal)),

  getHomeBestSellers: () =>
    isProd
      ? demoGet('products').then((list) => {
          const map = new Map(list.map((p) => [p.id, p]));
          return HOME_BEST_SELLER_IDS.map((id) => map.get(id)).filter(Boolean);
        })
      : axiosClient.get('/products').then((r) => {
          const map = new Map(r.data.map((p) => [p.id, p]));
          return HOME_BEST_SELLER_IDS.map((id) => map.get(id)).filter(Boolean);
        }),

  getBestSellers: () =>
    isProd
      ? demoGet('products').then((list) => list.filter((p) => p.bestSeller))
      : axiosClient
          .get('/products')
          .then((r) => r.data.filter((p) => p.bestSeller)),

  getTrending: () =>
    isProd
      ? demoGet('products').then((list) => list.filter((p) => p.trending))
      : axiosClient
          .get('/products')
          .then((r) => r.data.filter((p) => p.trending)),

  getRecommended: () =>
    isProd
      ? demoGet('products').then((list) => list.filter((p) => p.recommended))
      : axiosClient
          .get('/products')
          .then((r) => r.data.filter((p) => p.recommended)),

  search: (q) =>
    isProd
      ? demoGet('products').then((list) => {
          const query = q.toLowerCase();
          return list.filter(
            (p) =>
              p.title.toLowerCase().includes(query) ||
              p.description?.toLowerCase().includes(query) ||
              p.tags?.some((t) => t.includes(query))
          );
        })
      : axiosClient.get('/products').then((r) => {
          const query = q.toLowerCase();
          return r.data.filter(
            (p) =>
              p.title.toLowerCase().includes(query) ||
              p.description?.toLowerCase().includes(query) ||
              p.tags?.some((t) => t.includes(query))
          );
        }),
};
