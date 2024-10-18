// routes/transactions.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/init-seed-data', transactionController.initializeSeedData);
router.get('/transactions', transactionController.getAllTransactions);
router.get('/statistics', transactionController.getStatistics);
router.get('/bar-chart', transactionController.getBarChart);
router.get('/pie-chart', transactionController.getPieChart);
router.get('/combined-data', transactionController.getCombinedData);

module.exports = router;
