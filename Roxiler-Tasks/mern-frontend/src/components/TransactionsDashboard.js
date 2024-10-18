import React, { useState } from "react";
import "../App.css"; // Make sure this CSS file exists
import TransactionsTable from "./TransactionsTable";

const TransactionsDashboard = () => {
  const [month, setMonth] = useState("January");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard">
      <h2 className="dashboard-title"> Transaction Dashboard </h2>{" "}
      <div className="filters">
        <input
          type="text"
          placeholder="Search transaction"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="month-select"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((m) => (
            <option key={m} value={m}>
              {" "}
              {m}{" "}
            </option>
          ))}{" "}
        </select>{" "}
      </div>{" "}
      <table className="transactions-table">
        <thead>
          <tr>
            <th> ID </th> <th> Title </th> <th> Description </th>{" "}
            <th> Price </th> <th> Category </th> <th> Sold </th>{" "}
            <th> Image </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          
          {" "}
        </tbody>{" "}
      </table>{" "}
      <div className="pagination">
        <span> Page No: {page} </span>{" "}
        <button onClick={() => setPage(page > 1 ? page - 1 : page)}>
          {" "}
          Previous{" "}
        </button>{" "}
        <button onClick={() => setPage(page + 1)}> Next </button>{" "}
        <span> Per Page: 10 </span>{" "}
      </div>{" "}
    </div>
  );
};

export default TransactionsDashboard;
