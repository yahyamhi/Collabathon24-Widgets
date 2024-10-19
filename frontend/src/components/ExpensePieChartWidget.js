import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useFetch from '../hooks/useFetch';
import './ExpensePieChartWidget.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpensePieChartWidget = ({ isMaximized }) => {
  const [timeRange, setTimeRange] = useState('7days');

  const endpoint = '/api/expenses';
  const queryParams = { timeRange }; // Pass the time range as query params

  const { data: responseData, loading, error } = useFetch(endpoint, queryParams);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const expenseData = useMemo(() => {
    if (!responseData) return [];

    return responseData.map((expense) => ({
      name: expense.category,
      value: expense.amount,
    }));
  }, [responseData]);

  // Adjust outerRadius based on whether the widget is maximized
  const outerRadius = isMaximized ? 150 : 100;

  // Dynamic widget title based on selected time range
  const timeRangeText = {
    '7days': 'Last 7 Days',
    '15days': 'Last 15 Days',
    '30days': 'Last 30 Days',
    'all': 'All Data',
  }[timeRange];

  return (
    <div className="expense-pie-chart">
      {/* Dynamic title */}
      <h2>Expenses Insights - {timeRangeText}</h2>
      
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
          <p>Error loading data.</p>
        ) : expenseData.length > 0 ? (
          <ResponsiveContainer width="100%" height={isMaximized ? 500 : 400}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                outerRadius={outerRadius}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default ExpensePieChartWidget;
