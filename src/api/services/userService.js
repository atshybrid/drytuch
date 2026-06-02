import axiosClient from '../axiosClient';
import { demoGet, demoUsers } from '../../data/demoDb';

const isProd = import.meta.env.PROD;

export const userService = {
  getById: (id) =>
    isProd
      ? demoGet('users', { id })
      : axiosClient.get(`/users/${id}`).then((r) => r.data),

  login: async (email, password) => {
    const users = isProd
      ? demoUsers
      : await axiosClient.get('/users').then((r) => r.data);
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    const { password: _, ...safeUser } = user;
    return { user: safeUser, token: `mock-token-${user.id}` };
  },

  update: (id, data) =>
    isProd
      ? Promise.resolve({ ...demoUsers.find((u) => u.id === id), ...data })
      : axiosClient.patch(`/users/${id}`, data).then((r) => r.data),
};
