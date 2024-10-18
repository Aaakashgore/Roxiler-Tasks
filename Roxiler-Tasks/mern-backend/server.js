const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;  // Port for backend

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all requests

// Example route to send data to the frontend
app.get('/api/transactions', (req, res) => {
    const transactions = [
        { _id: 1, title: 'Transaction 1', description: 'Payment for services', price: 100, dateOfSale: new Date() },
        { _id: 2, title: 'Transaction 2', description: 'Payment for products', price: 200, dateOfSale: new Date() }
    ];
    res.json(transactions);
});

// Start server
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
