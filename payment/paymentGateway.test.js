const { createBraintreePayment, createPayPalTransaction } = require('./paymentGateways');

jest.mock('braintree');

describe('Payment Gateway', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('creates Braintree payment successfully', async () => {
        const creditCardDetails = {
            number: '4111111111111111',
            expirationMonth: '10',
            expirationYear: '2024',
            cvv: '123',
            cardholderName: 'John Doe'
        };

        const result = await createBraintreePayment('100.00', creditCardDetails);
        expect(result.success).toBe(true);
        expect(result.transaction.id).toBe('txn123');
    });

    test('throws error on Braintree payment failure', async () => {
        const creditCardDetails = {
            number: '4111111111111112',
            expirationMonth: '10',
            expirationYear: '2024',
            cvv: '123',
            cardholderName: 'John Doe'
        };

        await expect(createBraintreePayment('100.00', creditCardDetails)).rejects.toThrow('Transaction failed');
    });

    test('creates PayPal transaction successfully', async () => {
        const transactionRequest = {
            amount: '100.00',
            creditCard: {
                number: '4111111111111111',
                expirationMonth: '10',
                expirationYear: '2024',
                cvv: '123',
                cardholderName: 'John Doe'
            }
        };

        const result = await createPayPalTransaction(transactionRequest);
        expect(result.success).toBe(true);
        expect(result.transaction.id).toBe('txn123');
    });

    test('throws error on PayPal transaction failure', async () => {
        const transactionRequest = {
            amount: '100.00',
            creditCard: {
                number: '4111111111111112',
                expirationMonth: '10',
                expirationYear: '2024',
                cvv: '123',
                cardholderName: 'John Doe'
            }
        };

        await expect(createPayPalTransaction(transactionRequest)).rejects.toThrow('Transaction failed');
    });
});
