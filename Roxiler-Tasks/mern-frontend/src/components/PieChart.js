// src/components/PieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto'; // Required to set up Chart.js

const PieChart = ({ month }) => {
    const [data, setData] = useState({ labels: [], datasets: [] });

    const fetchPieChartData = async () => {
        const response = await axios.get(`http://localhost:5000/api/pie-chart`, {
            params: { month }
        });
        const categories = response.data;

        const labels = Object.keys(categories);
        const values = Object.values(categories);

        setData({
            labels,
            datasets: [{
                label: 'Items per Category',
                data: values,
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            }],
        });
    };

    useEffect(() => {
        fetchPieChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month]);

    return (
        <div>
            <h2>Pie Chart for {month}</h2>
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
