import React, { useEffect, useState } from 'react';

const Overview2 = () => {
    const [metrics, setMetrics] = useState([
        { title: 'Clients Added', value: 0, positive: true },
        { title: 'Contracts Signed', value: 0, positive: false },
        { title: 'Invoices Sent', value: 0, positive: true },
    ]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/overview-metrics');
                const data = await response.json();

                // Assuming the API response structure is:
                // { "clientsAdded": 2, "contractsSigned": 0, "invoicesSent": 1 }

                setMetrics([
                    {
                        title: 'Clients Added',
                        value: data.clientsAdded,
                        positive: true
                    },
                    {
                        title: 'Contracts Signed',
                        value: data.contractsSigned,
                        positive: false
                    },
                    {
                        title: 'Invoices Sent',
                        value: data.invoicesSent,
                        positive: true
                    }
                ]);
            } catch (error) {
                console.error('Error fetching overview metrics:', error);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {metrics.map((metric, idx) => (
                    <div 
                        key={idx} 
                        className={`p-6 rounded-lg shadow-md ${metric.positive ? 'bg-green-100' : 'bg-red-100'} flex flex-col justify-between`}
                    >
                        <h2 className="mb-2 text-lg font-semibold">{metric.title}</h2>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        {/* Removed change field */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Overview2;
