import React, { useEffect } from 'react';

const PaymentsGraph = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
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
                            backgroundColor: '#4CAF50',
                            fill: false,
                        },
                        {
                            label: 'Due Amount',
                            data: [32, 30, 35, 40, 45, 42, 50],
                            borderColor: '#F44336',
                            backgroundColor: '#F44336',
                            fill: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                },
            });
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Payments Overview</h3>
            <canvas id="paymentsChart" width="400" height="400"></canvas>
        </div>
    );
};

export default PaymentsGraph;
