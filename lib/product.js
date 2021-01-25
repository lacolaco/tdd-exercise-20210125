
/**
 * 製品のインスタンスを作成する
 * @param {{name: string; price: number}} params
 */
function createProduct({ name, price }) {
  return {
    name, price,
  };
}

module.exports = {
  createProduct,
};
