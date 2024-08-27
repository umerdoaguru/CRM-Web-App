import React, { useEffect } from 'react';

const DevicesGraph = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            const ctx = document.getElementById('devicesChart').getContext('2d');
            new window.Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Mobile', 'Tablet', 'Desktop'],
                    datasets: [
                        {
                            data: [70, 10, 20],
                            backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
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
            <h3 className="mb-4 text-lg font-semibold">Used Devices</h3>
            <canvas id="devicesChart" width="400" height="400"></canvas>
        </div>
    );
};

export default DevicesGraph;
