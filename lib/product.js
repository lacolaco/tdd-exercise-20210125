/**
 * @typedef Product
 * @type {object}
 * @property {string} name - 製品の名前
 * @property {number} price - 製品の価格.
 * @property {string} category - 製品の種類
 */

/**
 * 製品のインスタンスを作成する
 * @param {{name: string; price: number; category: string}} params
 * @returns {Product}
 */
function createProduct({ name, price, category }) {
  return {
    name,
    price,
    category,
  };
}

module.exports = {
  createProduct,
};
