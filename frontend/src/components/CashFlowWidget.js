// CashFlowWidget.js
import React, { useEffect, useState, useRef } from 'react';
import './CashFlowWidget.css';
import useFetch from '../hooks/useFetch';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CashFlowWidget = ({ refreshRate = 60, isMaximized }) => {
  const [timeRange, setTimeRange] = useState('7days');
  const chartRef = useRef(null);

  const endpoint = '/api/cash-flow';
  const queryParams = { timeRange };

  const { data: filteredData, loading, error } = useFetch(
    endpoint,
    queryParams,
    refreshRate
  );

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const chartData = React.useMemo(() => {
    if (!filteredData || filteredData.length === 0) return null;

    return {
      labels: filteredData.map((entry) => entry.date),
      datasets: [
        {
          label: 'Incoming',
          data: filteredData.map((entry) => entry.incoming),
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          fill: true,
        },
        {
          label: 'Outgoing',
          data: filteredData.map((entry) => entry.outgoing),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          fill: true,
        },
        {
          label: 'Liquidity Position',
          data: filteredData.map((entry) => entry.liquidityPosition),
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: true,
        },
      ],
    };
  }, [filteredData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    plugins: {
      title: {
        display: true,
        text: `Corporate Cash Flow Overview - Last ${timeRange}`,
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="cashflow-widget">
      {isMaximized && (
        <div className="time-range-selector">
          <label htmlFor="time-range">Select Time Range: </label>
          <select id="time-range" value={timeRange} onChange={handleTimeRangeChange}>
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="15days">Last 15 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      )}
      <div className="chart-container">
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error loading data: {error}</p>
        ) : chartData ? (
          <Line ref={chartRef} data={chartData} options={options} />
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default CashFlowWidget;
