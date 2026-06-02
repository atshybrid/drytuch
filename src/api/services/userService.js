import axiosClient from '../axiosClient';

export const userService = {
  getById: (id) => axiosClient.get(`/users/${id}`).then((r) => r.data),

  login: async (email, password) => {
    const users = await axiosClient.get('/users').then((r) => r.data);
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error('Invalid email or password');
    const { password: _, ...safeUser } = user;
    return { user: safeUser, token: `mock-token-${user.id}` };
  },

  update: (id, data) =>
    axiosClient.patch(`/users/${id}`, data).then((r) => r.data),
};
