import axios from 'axios';
import { API_BASE, STORAGE_KEYS } from '../constants';
import { getStorage } from '../utils/storage';
import localClient from './localApi';

const useLocalApi = import.meta.env.PROD;

/** Dev: json-server via /api proxy. Prod: bundled demo data (Vercel static). */
const axiosClient = useLocalApi
  ? localClient
  : axios.create({
      baseURL: API_BASE,
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' },
    });

if (!useLocalApi) {
  axiosClient.interceptors.request.use((config) => {
    const auth = getStorage(STORAGE_KEYS.AUTH_TOKEN);
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
      const message =
        error.response?.data?.message || error.message || 'Something went wrong';
      return Promise.reject(new Error(message));
    }
  );
}

export default axiosClient;
