const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    status: { type: String, required: true },
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    processorResponseCode: { type: String, required: true },
    processorResponseText: { type: String, required: true },
    card: {
        type: { type: String, required: true },
        last4: { type: String, required: true },
        expirationDate: { type: String, required: true }
    },
    merchant: {
        name: { type: String, required: true },
        address: {
            city: { type: String, required: true },
            state: { type: String, required: true }
        }
    },
    user: { type: String, required: true },
    transactionSource: { type: String, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
