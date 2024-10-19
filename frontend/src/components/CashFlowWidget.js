import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import './Widget.css';
import { Line } from 'react-chartjs-2';

// Import and register Chart.js components
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


const CashFlowWidget = ({ onClose }) => {
  const [cashFlowData, setCashFlowData] = useState([]);
  const { data, loading, error } = useFetch('/api/cash-flow');

  useEffect(() => {
    if (data) {
      setCashFlowData(data);
    }
  }, [data]);

  // Prepare data for the chart
  const chartData = {
    labels: cashFlowData.map(entry => entry.date),
    datasets: [
      {
        label: 'Incoming',
        data: cashFlowData.map(entry => entry.incoming),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Outgoing',
        data: cashFlowData.map(entry => entry.outgoing),
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    title: {
      display: true,
      text: 'Corporate Cash Flow Overview',
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="widget-container">
      <h2>Corporate Cash Flow Overview</h2>
      {loading ? (
        <p>Loading cash flow data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default CashFlowWidget;
