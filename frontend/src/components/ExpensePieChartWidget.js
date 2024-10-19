import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useFetch from '../hooks/useFetch';
import './ExpensePieChartWidget.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpensePieChartWidget = ({ isMaximized }) => {
  const { data, loading, error } = useFetch('/api/expenses');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  const expenseData = data ? data.map((expense) => ({
    name: expense.category,
    value: expense.amount,
  })) : [];

  // Adjust outerRadius based on whether the widget is maximized
  const outerRadius = isMaximized ? 250 : 100;

  return (
    <div className="expense-pie-chart">
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
    </div>
  );
};

export default ExpensePieChartWidget;
