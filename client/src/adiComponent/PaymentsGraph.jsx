import React, { useEffect } from 'react';

const PaymentsGraph = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        script.onload = () => {
            const ctx = document.getElementById('paymentsChart').getContext('2d');
            new window.Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                    datasets: [
                        {
                            label: 'Received Amount',
                            data: [45, 40, 55, 50, 70, 65, 75],
                            borderColor: '#4CAF50',
                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'Due Amount',
                            data: [32, 30, 35, 40, 45, 42, 50],
                            borderColor: '#F44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.2)',
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                borderDash: [2],
                            },
                        },
                    },
                },
            });
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Payments Overview</h3>
            <div className="relative w-full h-64">
                <canvas id="paymentsChart" className="absolute top-0 left-0 w-full h-full"></canvas>
            </div>
        </div>
    );
};

export default PaymentsGraph;
