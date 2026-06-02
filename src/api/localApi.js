import dbData from '../../server/db.json';

/** In-memory store for demo reads/writes on static hosting (Vercel) */
let store = structuredClone(dbData);

function delay(ms = 60) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function filterByParams(items, params = {}) {
  return items.filter((item) =>
    Object.entries(params).every(([key, val]) => {
      if (val === undefined || val === null || val === '') return true;
      const itemVal = item[key];
      if (typeof itemVal === 'boolean') {
        return itemVal === (val === true || val === 'true');
      }
      return String(itemVal) === String(val);
    })
  );
}

function getResource(name) {
  const data = store[name];
  if (!Array.isArray(data)) throw new Error(`Unknown resource: ${name}`);
  return data;
}

function ok(data) {
  return Promise.resolve({ data, status: 200, statusText: 'OK' });
}

function fail(message, status = 404) {
  const error = new Error(message);
  error.response = { data: { message }, status };
  return Promise.reject(error);
}

export async function handleLocalRequest(method, url, config = {}) {
  await delay();

  const path = url.split('?')[0];
  const segments = path.split('/').filter(Boolean);
  const resource = segments[0];
  const id = segments[1];
  const params = config.params || {};

  if (method === 'GET') {
    if (resource === 'categories') {
      const list = getResource('categories');
      if (id) {
        const item = list.find((c) => c.id === id);
        return item ? ok(item) : fail('Category not found');
      }
      return ok(list);
    }

    if (resource === 'products') {
      const list = getResource('products');
      if (id) {
        const item = list.find((p) => p.id === id);
        return item ? ok(item) : fail('Product not found');
      }
      return ok(filterByParams(list, params));
    }

    if (resource === 'users') {
      const list = getResource('users');
      if (id) {
        const item = list.find((u) => u.id === id);
        return item ? ok(item) : fail('User not found');
      }
      return ok(list);
    }

    if (resource === 'orders') {
      const list = getResource('orders');
      if (id) {
        const item = list.find((o) => o.id === id);
        return item ? ok(item) : fail('Order not found');
      }
      return ok(filterByParams(list, params));
    }

    if (resource === 'reviews') {
      return ok(filterByParams(getResource('reviews'), params));
    }

    if (resource === 'coupons') {
      return ok(getResource('coupons'));
    }

    if (resource === 'offers') {
      return ok(getResource('offers'));
    }

    if (resource === 'banners') {
      return ok(getResource('banners'));
    }

    if (resource === 'notifications') {
      return ok(filterByParams(getResource('notifications'), params));
    }

    if (resource === 'addresses') {
      return ok(filterByParams(getResource('addresses'), params));
    }
  }

  if (method === 'POST') {
    const body = config.data || {};
    const list = getResource(resource);
    const item = { ...body, id: body.id || String(Date.now()) };
    list.push(item);
    return ok(item);
  }

  if (method === 'PATCH') {
    const list = getResource(resource);
    const idx = list.findIndex((item) => item.id === id);
    if (idx === -1) return fail('Not found');
    list[idx] = { ...list[idx], ...config.data };
    return ok(list[idx]);
  }

  return fail(`Unsupported ${method} ${url}`, 400);
}

/** Axios-compatible client for production static hosting */
const localClient = {
  get: (url, config) => handleLocalRequest('GET', url, config),
  post: (url, data, config = {}) => handleLocalRequest('POST', url, { ...config, data }),
  patch: (url, data, config = {}) => handleLocalRequest('PATCH', url, { ...config, data }),
  delete: (url, config) => handleLocalRequest('DELETE', url, config),
  interceptors: {
    request: { use: () => {} },
    response: { use: (_ok, err) => ({ use: () => {} }) },
  },
};

export default localClient;
