// src/components/BarChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto"; // Required to set up Chart.js

const BarChart = ({ month }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  const fetchBarChartData = async () => {
    const response = await axios.get(`http://localhost:5000/api/bar-chart`, {
      params: { month },
    });
    const priceRanges = response.data;

    const labels = Object.keys(priceRanges);
    const values = Object.values(priceRanges);

    setData({
      labels,
      datasets: [
        {
          label: "Number of Items",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
  };

  useEffect(() => {
    fetchBarChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  return (
    <div>
      <h2> Bar Chart for {month} </h2> <Bar data={data} />{" "}
    </div>
  );
};

export default BarChart;
