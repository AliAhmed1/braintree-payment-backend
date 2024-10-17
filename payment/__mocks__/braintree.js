const mockSuccessResult = {
    success: true,
    transaction: { id: 'txn123', status: 'submitted_for_settlement' }
};

const mockFailureResult = {
    success: false,
    message: 'Transaction failed'
};

const BraintreeGateway = jest.fn(() => ({
    transaction: {
        sale: jest.fn((request) => {
            if (request.creditCard.number === '4111111111111111') {
                return Promise.resolve(mockSuccessResult);
            }
            return Promise.resolve(mockFailureResult);
        }),
    },
}));

const Environment = {
    Sandbox: 'sandbox',
};

module.exports = {
    BraintreeGateway,
    Environment,
};
