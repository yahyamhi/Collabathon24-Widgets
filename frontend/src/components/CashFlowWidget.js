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

  const { data: responseData, loading, error } = useFetch(
    endpoint,
    queryParams,
    refreshRate
  );

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const chartData = React.useMemo(() => {
    if (!responseData) return null;

    const { cashFlows, projections } = responseData;

    const historicalData = cashFlows || [];
    const projectedDataBase = projections?.baseCase || [];
    const projectedDataBest = projections?.bestCase || [];
    const projectedDataWorst = projections?.worstCase || [];

    // Combine dates from historical and projected data
    const labels = [
      ...historicalData.map((entry) => entry.date),
      ...projectedDataBase.map((entry) => entry.date),
    ];

    // Prepare datasets
    const incomingData = [
      ...historicalData.map((entry) => entry.incoming),
      ...new Array(projectedDataBase.length).fill(null),
    ];

    const outgoingData = [
      ...historicalData.map((entry) => entry.outgoing),
      ...new Array(projectedDataBase.length).fill(null),
    ];

    const netCashFlowData = [
      ...historicalData.map((entry) => entry.netCashFlow),
      ...new Array(projectedDataBase.length).fill(null),
    ];

    const liquidityPositionData = [
      ...historicalData.map((entry) => entry.liquidityPosition),
      ...new Array(projectedDataBase.length).fill(null),
    ];

    const projectedRevenueData = [
      ...new Array(historicalData.length).fill(null),
      ...projectedDataBase.map((entry) => entry.projectedRevenue),
    ];

    const projectedExpensesData = [
      ...new Array(historicalData.length).fill(null),
      ...projectedDataBase.map((entry) => entry.projectedExpenses),
    ];

    const netCashFlowProjectionData = [
      ...new Array(historicalData.length).fill(null),
      ...projectedDataBase.map((entry) => entry.netCashFlow),
    ];

    const liquidityForecastBaseData = [
      ...new Array(historicalData.length).fill(null),
      ...projectedDataBase.map((entry) => entry.liquidityForecast),
    ];

    const liquidityForecastBestData = [
      ...new Array(historicalData.length).fill(null),
      ...projectedDataBest.map((entry) => entry.liquidityForecast),
    ];

    const liquidityForecastWorstData = [
      ...new Array(historicalData.length).fill(null),
      ...projectedDataWorst.map((entry) => entry.liquidityForecast),
    ];

    return {
      labels,
      datasets: [
        {
          label: 'Incoming',
          data: incomingData,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          fill: false,
        },
        {
          label: 'Outgoing',
          data: outgoingData,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          fill: false,
        },
        {
          label: 'Net Cash Flow',
          data: netCashFlowData,
          borderColor: 'teal',
          backgroundColor: 'rgba(0, 128, 128, 0.2)',
          fill: false,
        },
        {
          label: 'Liquidity Position',
          data: liquidityPositionData,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: false,
        },
        {
          label: 'Projected Revenue',
          data: projectedRevenueData,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          fill: false,
          borderDash: [5, 5],
        },
        {
          label: 'Projected Expenses',
          data: projectedExpensesData,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          fill: false,
          borderDash: [5, 5],
        },
        {
          label: 'Net Cash Flow Projection',
          data: netCashFlowProjectionData,
          borderColor: 'teal',
          backgroundColor: 'rgba(0, 128, 128, 0.2)',
          fill: false,
          borderDash: [5, 5],
        },
        {
          label: 'LF (Base Case)',
          data: liquidityForecastBaseData,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: false,
          borderDash: [5, 5],
        },
        {
          label: 'LF (Best Case)',
          data: liquidityForecastBestData,
          borderColor: 'purple',
          backgroundColor: 'rgba(128, 0, 128, 0.2)',
          fill: false,
          borderDash: [10, 5],
        },
        {
          label: 'LF (Worst Case)',
          data: liquidityForecastWorstData,
          borderColor: 'orange',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          fill: false,
          borderDash: [2, 5],
        },
      ],
    };
  }, [responseData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for responsiveness
    plugins: {
      title: {
        display: true,
        text: `Cash Flow Insights - Last ${timeRange}`,
      },
      legend: {
        position: 'top',
        labels: {
          filter: function (legendItem, chartData) {
            // Only display datasets with data
            return chartData.datasets[legendItem.datasetIndex].data.some(
              (point) => point !== null
            );
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
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
            <option value="7days">Last 7 Days</option>
            <option value="15days">Last 15 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="all">All Data</option>
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
