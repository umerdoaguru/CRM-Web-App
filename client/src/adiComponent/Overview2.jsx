import React from 'react';

const Overview2 = () => {
    const metrics = [
        { title: 'Clients Added', value: 197, change: '+2.5%', positive: true },
        { title: 'Contracts Signed', value: 745, change: '-1.5%', positive: false },
        { title: 'Invoices Sent', value: 512, change: '+1.8%', positive: true },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {metrics.map((metric, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${metric.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                    <h2 className="text-xl font-semibold">{metric.title}</h2>
                    <p className="text-3xl">{metric.value}</p>
                    <p className={`text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change} Since last week
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Overview2;
