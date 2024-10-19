// frontend/src/components/ExpensePieChartWidget.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchExpenses } from '../api/expensesApi';
import styles from './ExpensePieChartWidget.module.css';

const ExpensePieChartWidget = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses()
            .then(data => setExpenses(data))
            .catch(err => console.error('Error fetching expenses:', err));
    }, []);

    const data = {
        labels: expenses.map(exp => exp.category),
        datasets: [{
            label: 'Expenses',
            data: expenses.map(exp => exp.amount),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#E7E9ED',
                '#4BC0C0',
                '#FF9F40',
                '#B4FF9F'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#E7E9ED',
                '#4BC0C0',
                '#FF9F40',
                '#B4FF9F'
            ]
        }]
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Expense Distribution</h2>
            <Pie data={data} />
        </div>
    );
};

export default ExpensePieChartWidget;
