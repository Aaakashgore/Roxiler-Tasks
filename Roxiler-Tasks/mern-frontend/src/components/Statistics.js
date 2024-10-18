// src/components/Statistics.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalSold: 0,
    totalNotSold: 0,
  });

  const fetchStatistics = async () => {
    const response = await axios.get(`http://localhost:5000/api/statistics`, {
      params: { month },
    });
    setStats(response.data);
  };

  useEffect(() => {
    fetchStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  return (
    <div>
      <h2> Statistics for {month} </h2>{" "}
      <p> Total Sales Amount: $ {stats.totalSales} </p>{" "}
      <p> Total Sold Items: {stats.totalSold} </p>{" "}
      <p> Total Not Sold Items: {stats.totalNotSold} </p>{" "}
    </div>
  );
};

export default Statistics;
