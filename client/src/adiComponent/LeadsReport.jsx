import React from 'react';

const leads = [
    { name: 'Charlie Donin', email: 'wdavis@aol.com', status: 'Lost Lead', duration: '3 Days', date: '25 Dec 2024 - 28 Dec 2024' },
    { name: 'Makenna Carder', email: 'ltorres@aol.com', status: 'Active', duration: '3 Days', date: '25 Dec 2024 - 28 Dec 2024' },
    // Add more leads as needed
];

const LeadsReport = () => {
    return (
        <div className="p-4 mt-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Leads Report</h3>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead, idx) => (
                        <tr key={idx}>
                            <td className="px-4 py-2">{lead.name}</td>
                            <td className="px-4 py-2">{lead.email}</td>
                            <td className="px-4 py-2">{lead.date}</td>
                            <td className="px-4 py-2">{lead.duration}</td>
                            <td className={`py-2 px-4 ${lead.status === 'Lost Lead' ? 'text-red-600' : 'text-green-600'}`}>
                                {lead.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadsReport;
