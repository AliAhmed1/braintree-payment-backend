const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const formRoutes = require('./routes/formRoutes');
const connectDB = require('./database/db');
const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', formRoutes);
app.use('/api', paymentRoutes);

app.listen(PORT || 4000, () => {
    console.log("App is listening on port", PORT);
});
