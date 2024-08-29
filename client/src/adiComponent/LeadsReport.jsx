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
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Name</th>
                            <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Email</th>
                            <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Date</th>
                            <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Duration</th>
                            <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leads.map((lead, idx) => (
                            <tr key={idx} className={`hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                <td className="px-4 py-2 text-sm font-medium text-gray-900">{lead.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{lead.email}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{lead.date}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{lead.duration}</td>
                                <td className={`px-4 py-2 text-sm font-medium ${lead.status === 'Lost Lead' ? 'text-red-600' : 'text-green-600'}`}>
                                    {lead.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeadsReport;
