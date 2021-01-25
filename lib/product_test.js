const assert = require("assert").strict;

const { createProduct } = require('./product');

describe('製品を作成できる', () => {
  describe('種類「ワードプロセッサ」の製品「MS Word」18,800 円を作成できる', () => {
    let product;

    beforeEach(() => {
      // Arrange
      product = createProduct({
        name: 'MS Word',
        price: 18800,
        category: 'ワードプロセッサ',
      });
    });

    test('製品の名前は"MS Word"である', () => {
      assert(product.name === 'MS Word');
    });
    test('製品の価格は18800である', () => {
      assert(product.price === 18800);
    });
    test('製品の種類はワードプロセッサである', () => {
      assert(product.category === 'ワードプロセッサ');
    });
  });

  describe('種類「スプレッドシート」の製品「MS Excel」27,800 円を作成できる', () => {
    let product;

    beforeEach(() => {
      // Arrange
      product = createProduct({
        name: 'MS Excel',
        price: 27800,
        category: 'スプレッドシート',
      });
    });

    test('製品の名前は"MS Excel"である', () => {
      assert(product.name === 'MS Excel');
    });
    test('製品の価格は27800である', () => {
      assert(product.price === 27800);
    });
    test('製品の種類はスプレッドシートである', () => {
      assert(product.category === 'スプレッドシート');
    });
  });

  describe('種類「データベース」の製品「MS SQL Server」919,000 円を作成できる', () => {
    let product;

    beforeEach(() => {
      // Arrange
      product = createProduct({
        name: 'MS SQL Server',
        price: 919000,
        category: 'データベース',
      });
    });

    test('製品の名前は"MS SQL Server"である', () => {
      assert(product.name === 'MS SQL Server');
    });
    test('製品の価格は919000である', () => {
      assert(product.price === 919000);
    });
    test('製品の種類はデータベースである', () => {
      assert(product.category === 'データベース');
    });
  });
});
