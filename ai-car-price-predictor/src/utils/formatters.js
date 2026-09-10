import { CURRENCY, CURRENCY_SYMBOL } from './constants';

export function formatPrice(price) {
  if (price === null || price === undefined || isNaN(price)) {
    return '-';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) {
    return '-';
  }
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(dateString) {
  if (!dateString) return '-';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function getModelDisplayName(modelId) {
  const models = {
    'ridge': 'Ridge Regression',
    'random-forest': 'Random Forest',
    'gradient-boosting': 'Gradient Boosting',
    'svr': 'SVR',
  };
  return models[modelId] || modelId;
}