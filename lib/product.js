
/**
 * 製品のインスタンスを作成する
 * @param {{name: string; price: number; category: string}} params
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
