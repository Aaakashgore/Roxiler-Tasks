// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    productId: String,
    title: String,
    description: String,
    category: String,
    price: Number,
    dateOfSale: { type: Date, required: true },
    sold: Boolean
});

module.exports = mongoose.model('Transaction', transactionSchema);