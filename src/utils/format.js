/** Currency and display formatting helpers */

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const calcDiscountPercent = (price, originalPrice) =>
  originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
