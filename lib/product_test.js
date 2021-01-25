const assert = require("assert").strict;

const { createProduct } = require('./product');

describe('製品は名前(name)と価格(price)を持つ', () => {
  test("製品は名前(name)を持つ", () => {
    // Arrange
    // Act
    const product = createProduct();
    // Assert
    assert(product.name !== undefined);
  });

  test("製品は価格(price)を持つ", () => {
    // Arrange
    // Act
    const product = createProduct();
    // Assert
    assert(product.price !== undefined);
  });
});
