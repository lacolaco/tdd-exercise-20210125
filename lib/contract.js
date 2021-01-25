/**
 * @typedef {import('./product.js').Product} Product
 */

/**
 * @typedef Contract
 * @type {object}
 * @property {Product} product - 購入する製品
 * @property {string} signedDate - 契約日
 * @property {number} revenue - 契約日
 * @property {Array<RevenueRecognition>} revenueRecognitions - 契約日
 */

/**
 * @typedef RevenueRecognition 収益認識
 * @type {object}
 * @property {string} date - 認識日
 * @property {number} amount - 認識金額
 */

/**
 * 購入契約を作成する
 * @param {{product: Product; signedDate: string;}} params
 * @returns {Contract}
 */
function createContract({ product, signedDate }) {
  return {
    product,
    signedDate,
    revenue: calculateRevenue(product),
    revenueRecognitions: calculateRevenueRecognitions(product, signedDate)
  };
}

/**
 * 契約の売上を計算する
 * @param {Contract} contract
 * @returns {number}
 */
function calculateRevenue(product) {
  return product.price;
}

/**
 * 収益認識を計算する
 * @param {Product} product 製品
 * @param {string} signedDate 契約日
 * @returns {Array<RevenueRecognition>}
 */
function calculateRevenueRecognitions(product, signedDate) {
  const date = new Date(signedDate);
  switch (product.category) {
    case "ワードプロセッサ": {
      return [
        {
          date: formatDateString(date),
          amount: product.price
        }
      ];
    }
    case "スプレッドシート": {
      const firstRevenue = roundPrice(product.price * (2 / 3));
      return [
        {
          date: formatDateString(date),
          amount: firstRevenue
        },
        {
          date: formatDateString(addDays(date, 30)),
          amount: product.price - firstRevenue
        }
      ];
    }
    case "データベース": {
      const firstRevenue = roundPrice(product.price * (1 / 3));
      const secondRevenue = roundPrice(product.price * (1 / 3));
      return [
        {
          date: formatDateString(date),
          amount: firstRevenue
        },
        {
          date: formatDateString(addDays(date, 60)),
          amount: secondRevenue
        },
        {
          date: formatDateString(addDays(date, 30)),
          amount: product.price - (firstRevenue + secondRevenue)
        }
      ];
    }
  }
}

/**
 * @param {Date} date
 */
function formatDateString(date) {
  return date.toISOString().split("T")[0];
}

/**
 * @param {Date} date
 * @param {number} days
 */
function addDays(date, days) {
  return new Date(date.setDate(date.getDate() + days));
}

function roundPrice(number) {
  return Math.floor(number);
}

module.exports = {
  createContract
};
