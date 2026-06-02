import axiosClient from '../axiosClient';

export const reviewService = {
  getByProduct: (productId) =>
    axiosClient
      .get('/reviews', { params: { productId } })
      .then((r) => r.data),
};
