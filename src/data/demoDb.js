import db from '../../server/db.json';

/** Bundled demo data for static production hosting */
export const demoDb = db;

export const demoCategories = db.categories;
export const demoProducts = db.products;
export const demoUsers = db.users;
export const demoOrders = db.orders;
export const demoReviews = db.reviews;
export const demoCoupons = db.coupons;
export const demoOffers = db.offers;
export const demoBanners = db.banners;
export const demoNotifications = db.notifications;
export const demoAddresses = db.addresses;

const wait = () => new Promise((r) => setTimeout(r, 0));

export async function demoGet(resource, { id, params } = {}) {
  await wait();
  const list = demoDb[resource];
  if (!Array.isArray(list)) throw new Error(`Unknown resource: ${resource}`);

  if (id) {
    const item = list.find((x) => x.id === id);
    if (!item) throw new Error('Not found');
    return item;
  }

  if (!params || Object.keys(params).length === 0) return list;

  return list.filter((item) =>
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
