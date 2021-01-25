const assert = require("assert").strict;

const { createProduct } = require('./product');

describe('製品は名前(name)と価格(price)を持つ', () => {
  let product;

  beforeEach(() => {
    // Arrange
    product = createProduct({
      name: 'MS Word',
      price: 18800,
    });
  })

  test('製品は名前をnameプロパティとして持つ', () => {
    // Assert
    assert(product.name === 'MS Word');
  });

  test('製品は価格をpriceプロパティとして持つ', () => {
    // Assert
    assert(product.price === 18800);
  });
});

test('製品は製品種類に含まれる', () => {

})
