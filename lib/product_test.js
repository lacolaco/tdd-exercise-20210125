const assert = require("assert").strict;

const { createProduct } = require('./product');

describe('製品のテスト', () => {
  let product;

  beforeEach(() => {
    // Arrange
    product = createProduct({
      name: 'MS Word',
      price: 18800,
    });
  });

  describe('製品は名前(name)と価格(price)を持つ', () => {
    test('製品は名前をnameプロパティとして持つ', () => {
      // Assert
      assert(product.name === 'MS Word');
    });

    test('製品は価格をpriceプロパティとして持つ', () => {
      // Assert
      assert(product.price === 18800);
    });
  });

  describe('製品は種類をもつ', () => {
    test('製品はcategoryプロパティを持つ', () => {
      assert(product.category != null);
    });

    test('製品の種類は名前を持つ', () => {
      assert(product.category.name === 'ワードプロセッサ')
    })
  });
});
