import axiosClient from '../axiosClient';

const HOME_BEST_SELLER_IDS = ['3', '2', '4', '12'];

export const productService = {
  getAll: (params = {}) =>
    axiosClient.get('/products', { params }).then((r) => r.data),

  getById: (id) => axiosClient.get(`/products/${id}`).then((r) => r.data),

  getByCategory: (categoryId) =>
    axiosClient
      .get('/products', { params: { categoryId } })
      .then((r) => r.data),

  getFeatured: () =>
    axiosClient
      .get('/products', { params: { featured: true } })
      .then((r) => r.data.filter((p) => p.featured)),

  getDeals: () =>
    axiosClient.get('/products').then((r) => r.data.filter((p) => p.deal)),

  getHomeBestSellers: () =>
    axiosClient.get('/products').then((r) => {
      const map = new Map(r.data.map((p) => [p.id, p]));
      return HOME_BEST_SELLER_IDS.map((id) => map.get(id)).filter(Boolean);
    }),

  getBestSellers: () =>
    axiosClient
      .get('/products')
      .then((r) => r.data.filter((p) => p.bestSeller)),

  getTrending: () =>
    axiosClient
      .get('/products')
      .then((r) => r.data.filter((p) => p.trending)),

  getRecommended: () =>
    axiosClient
      .get('/products')
      .then((r) => r.data.filter((p) => p.recommended)),

  search: (q) =>
    axiosClient.get('/products').then((r) => {
      const query = q.toLowerCase();
      return r.data.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.includes(query))
      );
    }),
};
