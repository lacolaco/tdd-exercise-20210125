
const assert = require("assert").strict;
const { createProduct } = require('./product');
const { createContract } = require('./contract');

describe('製品を購入する契約を作成できる', () => {
    describe('契約は1つの製品を1つだけ購入できる', () => {
        describe('種類「ワードプロセッサ」の製品「MS Word」18,800 円を購入する契約を作成できる', () => {
            let product;
            let contract;
            beforeEach(() => {
                product = createProduct({
                    name: 'MS Word',
                    price: 18800,
                    category: 'ワードプロセッサ',
                });
                contract = createContract({ product });
            });
            test('契約を作成できる', () => {
                assert(contract != null)
            });

            test('契約は製品を持つ', () => {
                assert(contract.product === product)
            });
        });
        describe('種類「スプレッドシート」の製品「MS Excel」27,800 円を購入する契約を作成できる', () => {
            let product;
            let contract;
            beforeEach(() => {
                product = createProduct({
                    name: 'MS Excel',
                    price: 27800,
                    category: 'スプレッドシート',
                });
                contract = createContract({ product });
            });
            test('契約を作成できる', () => {
                assert(contract != null)
            });
            test('契約は製品を持つ', () => {
                assert(contract.product === product)
            });
        });
        describe('種類「データベース」の製品「MS SQL Server」919,000 円を購入する契約を作成できる', () => {
            let product;
            let contract;
            beforeEach(() => {
                product = createProduct({
                    name: 'MS SQL Server',
                    price: 919000,
                    category: 'データベース',
                });
                contract = createContract({ product });
            });
            test('契約を作成できる', () => {
                assert(contract != null)
            });
            test('契約は製品を持つ', () => {
                assert(contract.product === product)
            });
        });
    });
});
