// frontend/src/components/CashFlowWidget.js
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import './Widget.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CashFlowWidget = () => {
  const { data, loading, error } = useFetch('/api/cash-flow'); // Fetch data from the API
  const [chartData, setChartData] = useState(null); // Initialize as null

  // Monitor fetched data
  useEffect(() => {
    console.log('Fetched data:', data); // Debugging log to ensure data is fetched correctly

    if (data && Array.isArray(data)) {
      // Only proceed if data is available and is an array
      setChartData({
        labels: data.map((entry) => entry.date),
        datasets: [
          {
            label: 'Incoming',
            data: data.map((entry) => entry.incoming),
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: true,
          },
          {
            label: 'Outgoing',
            data: data.map((entry) => entry.outgoing),
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
          },
          {
            label: 'Liquidity Position',
            data: data.map((entry) => entry.liquidityPosition),
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            fill: true,
          },
        ],
      });
    } else {
      console.error('Data is either undefined or not an array:', data); // Log if data is missing
    }
  }, [data]);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Corporate Cash Flow Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Render
  return (
    <div className="widget-container">
      <h2>Corporate Cash Flow Overview</h2>
      {loading ? (
        <p>Loading cash flow data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default CashFlowWidget;
