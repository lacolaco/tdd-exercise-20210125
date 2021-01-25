/**
 * @typedef {import('./product.js').Product} Product
 */

/**
 * @typedef Contract
 * @type {object}
 * @property {Product} product - 購入する製品
 */

/**
 * 購入契約を作成する
 * @param {{product: Product}} params
 * @returns {Contract}
 */
function createContract({ product }) {
    return {
        product,
    }
}

module.exports = {
    createContract,
};
