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
        revenueRecognitions: calculateRevenueRecognitions(),
    }
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
 * @returns {Array<RevenueRecognition>}
 */
function calculateRevenueRecognitions() {
    return [{
        date: '',
        amount: 0,
    }];
}

module.exports = {
    createContract,
};
