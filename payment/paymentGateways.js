const braintree = require('braintree');
require('dotenv').config();

const braintreeGateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

const createBraintreePayment = async (amount, creditCardDetails) => {
    try {
        const result = await braintreeGateway.transaction.sale({
            amount: amount,
            creditCard: creditCardDetails,
            options: {
                submitForSettlement: true
            }
        });
        
        if (!result.success) {
            throw new Error(result.message);
        }
        
        return result;
    } catch (error) {
        console.error("Braintree payment error:", error);
        throw error;
    }
};

const createPayPalTransaction = async (transactionRequest) => {
    try {
        const result = await braintreeGateway.transaction.sale(transactionRequest);
        
        if (!result.success) {
            throw new Error(result.message);
        }
        
        return result;
    } catch (error) {
        console.error("PayPal transaction error:", error);
        throw error;
    }
};

module.exports = {
    createBraintreePayment,
    createPayPalTransaction,
};
