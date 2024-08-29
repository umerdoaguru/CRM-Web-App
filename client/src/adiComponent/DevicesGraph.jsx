import React, { useEffect } from 'react';

const DevicesGraph = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
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
                    maintainAspectRatio: false, // Allow the chart to resize based on container
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                },
            });
        };
        document.body.appendChild(script);

        // Cleanup script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Used Devices</h3>
            <div className="relative w-full h-64">
                <canvas id="devicesChart" className="absolute top-0 left-0 w-full h-full"></canvas>
            </div>
        </div>
    );
};

export default DevicesGraph;
