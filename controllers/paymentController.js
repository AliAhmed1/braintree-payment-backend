const Payment = require('../models/paymentModel');
const PaymentGateway = require('../payment/paymentGateways');
const { validatePayment, isAmex } = require('../utilities');

const processPayment = async (req, res) => {
    const { amount, currency, cardholderName, number, expirationMonth, expirationYear, cvv, fullName } = req.body;

    const creditCard = {
        number,
        expirationMonth,
        expirationYear,
        cvv,
        cardholderName
    };

    try {
        validatePayment(amount, creditCard, currency);

        let result;
        if (isAmex(creditCard.number) || ['USD', 'EUR', 'AUD'].includes(currency)) {
            const paypalTransactionRequest = {
                amount: amount,
                creditCard,
                options: {
                    submitForSettlement: true,
                    paypal: {
                        customField: 'Optional custom field',
                        description: 'Transaction description for AMEX using PayPal'
                    }
                }
            };
            result = await PaymentGateway.createPayPalTransaction(paypalTransactionRequest);
        } else {
            result = await PaymentGateway.createBraintreePayment(amount, creditCard);
        }

        const paymentData = {
            transactionId: result.transaction.id,
            status: result.transaction.status,
            amount: result.transaction.amount,
            currency: result.transaction.currencyIsoCode,
            createdAt: result.transaction.createdAt,
            updatedAt: result.transaction.updatedAt,
            processorResponseCode: result.transaction.processorResponseCode,
            processorResponseText: result.transaction.processorResponseText,
            card: {
                type: result.transaction.creditCard.cardType,
                last4: result.transaction.creditCard.last4,
                expirationDate: `${result.transaction.creditCard.expirationMonth}/${result.transaction.creditCard.expirationYear}`
            },
            merchant: {
                name: result.transaction.merchantName,
                address: {
                    city: result.transaction.merchantAddress.locality,
                    state: result.transaction.merchantAddress.region
                }
            },
            user: fullName,
            transactionSource: 'api'
        };

        const payment = new Payment(paymentData);
        await payment.save();
        res.send(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    processPayment
};
