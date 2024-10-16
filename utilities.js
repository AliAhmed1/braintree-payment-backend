const validatePayment = (amount, creditCard, currency) => {
    if (!amount || !creditCard) {
        throw new Error('Amount and credit card details are required.');
    }

    if (isNaN(amount) || amount <= 0) {
        throw new Error('Amount must be a positive number.');
    }

    if (currency !== 'USD' && isAmex(creditCard?.number)) {
        throw new Error("AMEX can only be used for transactions in USD." );
    }
};
const isAmex = (cardNumber) => {
    const amexRegex = /^(34|37)\d{13}$/;
    return amexRegex.test(cardNumber);
};

module.exports = {
    validatePayment, isAmex
}