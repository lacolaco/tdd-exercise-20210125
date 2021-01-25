/**
 * @typedef {import('./product.js').Product} Product
 */

/**
 * @typedef Contract
 * @type {object}
 * @property {Product} product - 購入する製品
 * @property {string} signedDate - 契約日
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
    }
}

module.exports = {
    createContract,
};
