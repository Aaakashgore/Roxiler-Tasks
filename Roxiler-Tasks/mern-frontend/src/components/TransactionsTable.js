import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions"
      ); // Backend URL
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2> Transactions </h2>{" "}
      <table>
        <thead>
          <tr>
            <th> Title </th> <th> Description </th> <th> Price </th>{" "}
            <th> Date </th>{" "}
            
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td> {transaction.title} </td>{" "}
              <td> {transaction.description} </td>{" "}
              <td> {transaction.price} </td>{" "}
              <td> {new Date(transaction.dateOfSale).toLocaleDateString()} </td>
              {" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>{" "}
    </div>
  );
};

export default TransactionsTable;
