
const assert = require("assert").strict;
const { createProduct } = require('./product');
const { createContract } = require('./contract');

describe('製品を購入する契約を作成できる', () => {
    describe('契約は契約日を持ち、1つの製品を1つだけ購入できる', () => {
        describe('2021/01/25を契約日とし、任意の製品を購入する契約を作成できる', () => {
            let product;
            let contract;
            beforeEach(() => {
                product = createProduct({
                    name: 'MS Word',
                    price: 18800,
                    category: 'ワードプロセッサ',
                });
                contract = createContract({
                    product,
                    signedDate: '2021-01-25',
                });
            });
            test('契約を作成できる', () => {
                assert(contract != null)
            });
            test('契約は製品を持つ', () => {
                assert(contract.product === product)
            });
            test('契約は契約日を持つ', () => {
                assert(contract.signedDate === '2021-01-25')
            });
        });
    });
});
