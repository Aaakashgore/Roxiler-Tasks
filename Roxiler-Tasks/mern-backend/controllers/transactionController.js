// controllers/transactionController.js
const axios = require('axios');
const Transaction = require('../models/Transaction');

exports.initializeSeedData = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);
    res.json({ message: 'Data seeded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  const { search, month, page = 1, perPage = 10 } = req.query;
  const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  const query = {
    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
  };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: { $regex: search, $options: 'i' } }
    ];
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));

  const total = await Transaction.countDocuments(query);

  res.json({ transactions, total });
};

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  const transactions = await Transaction.aggregate([
    { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } } },
    { $group: {
      _id: null,
      totalSalesAmount: { $sum: { $cond: ["$sold", "$price", 0] }},
      totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] }},
      totalUnsoldItems: { $sum: { $cond: ["$sold", 0, 1] }},
    }}
  ]);

  res.json(transactions[0] || { totalSalesAmount: 0, totalSoldItems: 0, totalUnsoldItems: 0 });
};

exports.getBarChart = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  const transactions = await Transaction.aggregate([
    { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } } },
    { $bucket: {
      groupBy: "$price",
      boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
      default: "901-above",
      output: { count: { $sum: 1 } }
    }}
  ]);

  const result = transactions.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  res.json(result);
};

exports.getPieChart = async (req, res) => {
  const { month } = req.query;
  const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  const categories = await Transaction.aggregate([
    { $match: { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } } },
    { $group: {
      _id: "$category",
      count: { $sum: 1 }
    }}
  ]);

  res.json(categories);
};

exports.getCombinedData = async (req, res) => {
  const { month } = req.query;

  const statistics = await exports.getStatistics(req, res);
  const barChart = await exports.getBarChart(req, res);
  const pieChart = await exports.getPieChart(req, res);

  res.json({ statistics, barChart, pieChart });
};
