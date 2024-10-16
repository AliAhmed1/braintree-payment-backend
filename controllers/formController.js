const renderForm = (req, res) => {
    res.send(`
        <form method="POST" action="/api/payment">
            <h2>Order</h2>
            <label>Price (amount):</label>
            <input type="number" name="amount" required min="0.01" step="0.01" placeholder="Enter amount" /><br/>
            <label>Currency:</label>
            <select name="currency" required>
                <option value="">Select currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="THB">THB</option>
                <option value="HKD">HKD</option>
                <option value="SGD">SGD</option>
                <option value="AUD">AUD</option>
            </select><br/>
            <label>Customer Full Name:</label>
            <input type="text" name="fullName" required pattern="^[a-zA-Z\s]+$" title="Please enter a valid name" placeholder="Enter your full name" /><br/>

            <h2>Payment</h2>
            <label>Credit Card Holder Name:</label>
            <input type="text" name="cardholderName" required pattern="^[a-zA-Z\s]+$" title="Please enter a valid name" placeholder="Enter cardholder name" /><br/>
            <label>Credit Card Number:</label>
            <input type="text" name="number" required pattern="^\\d{15,16}$" title="Please enter a valid 16-digit card number" placeholder="Enter card number" /><br/>
            <label>Expiration Month:</label>
            <input type="number" name="expirationMonth" required min="1" max="12" placeholder="MM" /><br/>
            <label>Expiration Year:</label>
            <input type="number" name="expirationYear" required placeholder="YYYY" /><br/>
            <label>CVV:</label>
            <input type="text" name="cvv" required pattern="^\\d{3,4}$" title="Please enter a valid CVV" placeholder="Enter CVV" /><br/>
            <button type="submit">Submit</button>
        </form>
    `);
};

module.exports = {
    renderForm
};
