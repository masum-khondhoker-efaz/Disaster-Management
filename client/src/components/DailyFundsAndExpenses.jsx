import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyFundsChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        fetchDailyFundsAndExpenses();
    }, []);

    const fetchDailyFundsAndExpenses = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/daily-funds-expenses');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const chartData = {
                labels: data.dailyFunds.map(item => item._id),
                datasets: [
                    {
                        label: 'Daily Donations',
                        data: data.dailyFunds.map(item => item.total),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    },
                    {
                        label: 'Daily Expenses',
                        data: data.dailyExpenses.map(item => item.total),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    }
                ]
            };
            setChartData(chartData);
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };

    return (
        <div className="chart-container">
            {chartData.datasets && chartData.datasets.length > 0 ? (
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        scales: {
                            x: { beginAtZero: true },
                            y: { beginAtZero: true }
                        }
                    }}
                />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default DailyFundsChart;
