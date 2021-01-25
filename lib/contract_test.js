
const assert = require("assert").strict;
const { createProduct } = require('./product');
const { createContract } = require('./contract');

describe('製品を購入する契約を作成できる', () => {
    describe('契約は契約日を持ち、1つの製品を1つだけ購入できる', () => {
        describe('2021/01/25を契約日とし、任意の製品を購入する契約を作成できる', () => {
            const product = createProduct({ name: 'MS Word', price: 18800, category: 'ワードプロセッサ' });
            let contract;
            beforeEach(() => {
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

describe('契約から売上（製品の価格）と収益認識を計算できる', () => {
    describe('契約の売上は製品の価格の総和である', () => {
        test('1つの製品を購入した契約の売上は製品の価格と一致する', () => {
            const product = createProduct({ name: 'MS Word', price: 10000, category: 'ワードプロセッサ' });
            const contract = createContract({ product, signedDate: '2021-01-25' });

            assert(contract.revenue === product.price);
        });
    });

    describe('契約からいつにいくら収益認識されるかがわかる', () => {
        const product = createProduct({ name: 'MS Word', price: 10000, category: 'ワードプロセッサ' })
        const contract = createContract({ product, signedDate: '2021-01-25' });

        test('契約は1つ以上の収益認識を持つ', () => {
            assert(contract.revenueRecognitions.length >= 1);
        });
        test('収益認識は認識日を持つ', () => {
            const revenueRecognition = contract.revenueRecognitions[0];

            assert(revenueRecognition.date != null);
        });
        test('収益認識は金額を持つ', () => {
            const revenueRecognition = contract.revenueRecognitions[0];

            assert(revenueRecognition.amount != null);
        });
    });

    test('収益認識の総和は売上と完全一致する', () => {
        const product = createProduct({ name: 'MS Word', price: 10000, category: 'ワードプロセッサ' })
        const contract = createContract({ product, signedDate: '2021-01-25' });

        const totalRecognizedRevenue = contract.revenueRecognitions.reduce((sum, recognition) => {
            return sum + recognition.amount;
        }, 0);

        assert(contract.revenue === totalRecognizedRevenue);
    });

    describe('収益認識は製品の種類に応じて計算される', () => {
        describe('ワードプロセッサは契約日に直ちに売上全額を収益認識する', () => {
            const product = createProduct({ name: 'MS Word', price: 10000, category: 'ワードプロセッサ' })

            test('契約の収益認識は1回である', () => {
                const contract = createContract({ product, signedDate: '2021-01-25' });
                assert(contract.revenueRecognitions.length === 1);
            });

            test('収益認識の日付は契約日と一致する', () => {
                const contract = createContract({ product, signedDate: '2021-01-25' });
                const revenueRecognition = contract.revenueRecognitions[0];
                assert(revenueRecognition.date === contract.signedDate);
            });
        });
    });
});
