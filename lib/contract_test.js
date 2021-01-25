
const assert = require('assert').strict;
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
                assert.equal(contract.revenueRecognitions.length, 1);
            });

            test('収益認識の日付は契約日と一致する', () => {
                const contract = createContract({ product, signedDate: '2021-01-25' });
                const revenueRecognition = contract.revenueRecognitions[0];
                assert.equal(revenueRecognition.date, contract.signedDate);
            });

            test('収益認識の総和は売上と完全一致する', () => {
                const contract = createContract({ product, signedDate: '2021-01-25' });
                const totalRecognizedRevenue = contract.revenueRecognitions.reduce((sum, recognition) => {
                    return sum + recognition.amount;
                }, 0);

                assert(contract.revenue === totalRecognizedRevenue);
            });
        });

        describe('スプレッドシートは契約日に売上の 2/3、30 日後に 1/3 を収益認識する', () => {
            const product = createProduct({ name: 'MS Excel', price: 27800, category: 'スプレッドシート' })

            test('契約の収益認識は2回である', () => {
                const contract = createContract({ product, signedDate: '2021-01-25' });
                assert.equal(contract.revenueRecognitions.length, 2);
            });

            describe('収益認識の1つめは契約日に売上の 2/3を認識する', () => {
                test('認識日は契約日と一致する', () => {
                    const contract = createContract({ product, signedDate: '2021-01-25' });
                    const revenueRecognition = contract.revenueRecognitions[0];
                    assert.equal(revenueRecognition.date, contract.signedDate);
                });
                test('認識金額は売上の2/3の端数を切り捨てた18533円である', () => {
                    const contract = createContract({ product, signedDate: '2021-01-25' });
                    const revenueRecognition = contract.revenueRecognitions[0];
                    assert.equal(revenueRecognition.amount, 18533);
                });
            });
            describe('収益認識の2つめは契約日の30日後に残りの売上を認識する', () => {
                test('認識日は契約日の30日後の日付と一致する', () => {
                    const contract = createContract({ product, signedDate: '2021-01-01' });
                    const revenueRecognition = contract.revenueRecognitions[1];

                    assert.equal(revenueRecognition.date, '2021-01-31');
                });
                test('認識金額は初回の認識額を引いた売上の残り1/3の9267円である', () => {
                    const contract = createContract({ product, signedDate: '2021-01-25' });
                    const revenueRecognition = contract.revenueRecognitions[1];
                    assert.equal(revenueRecognition.amount, 9267);
                });
            });
            test('収益認識の総和は売上と完全一致する', () => {
                const contract = createContract({ product, signedDate: '2021-01-25' });
                const totalRecognizedRevenue = contract.revenueRecognitions.reduce((sum, recognition) => {
                    return sum + recognition.amount;
                }, 0);

                assert(contract.revenue === totalRecognizedRevenue);
            });
        });

        describe('データベースは契約日に売上の 1/3、60 日後に 1/3、120 日後に残りを収益認識する', () => {
            const product = createProduct({ name: 'MS SQL Server', price: 919000, category: 'データベース' })

            test('契約の収益認識は3回である', () => {
                const contract = createContract({ product, signedDate: '2021-01-25' });
                assert.equal(contract.revenueRecognitions.length, 3);
            });

            describe('収益認識の1つめは契約日に売上の 1/3を認識する', () => {
                test('認識日は契約日と一致する', () => {
                    const contract = createContract({ product, signedDate: '2021-01-25' });
                    const revenueRecognition = contract.revenueRecognitions[0];
                    assert.equal(revenueRecognition.date, contract.signedDate);
                });
                test('認識金額は売上の1/3の端数を切り捨てた306333円である', () => {
                    const contract = createContract({ product, signedDate: '2021-01-25' });
                    const revenueRecognition = contract.revenueRecognitions[0];
                    assert.equal(revenueRecognition.amount, 306333);
                });
            });
            describe('収益認識の2つめは契約日の60日後に1/3の売上を認識する', () => {
                test('認識日は契約日の60日後の日付と一致する', () => {
                    const contract = createContract({ product, signedDate: '2021-01-01' });
                    const revenueRecognition = contract.revenueRecognitions[1];

                    assert.equal(revenueRecognition.date, '2021-03-02');
                });
                test('認識金額は売上の1/3の端数を切り捨てた306333円である', () => {
                    const contract = createContract({ product, signedDate: '2021-01-25' });
                    const revenueRecognition = contract.revenueRecognitions[1];
                    assert.equal(revenueRecognition.amount, 306333);
                });
            });
            describe('収益認識の3つめは契約日の120日後に残りの売上を認識する', () => {
                test('認識日は契約日の120日後の日付と一致する', () => {
                    const contract = createContract({ product, signedDate: '2021-01-01' });
                    const revenueRecognition = contract.revenueRecognitions[2];

                    assert.equal(revenueRecognition.date, '2021-04-01');
                });
                test('認識金額は売上の2/3を引いた残りの306334円である', () => {
                    const contract = createContract({ product, signedDate: '2021-01-25' });
                    const revenueRecognition = contract.revenueRecognitions[2];
                    assert.equal(revenueRecognition.amount, 306334);
                });
            });
            test('収益認識の総和は売上と完全一致する', () => {
                const contract = createContract({ product, signedDate: '2021-01-25' });
                const totalRecognizedRevenue = contract.revenueRecognitions.reduce((sum, recognition) => {
                    return sum + recognition.amount;
                }, 0);
                assert(contract.revenue === totalRecognizedRevenue);
            });
        });
    });
});
