import React, { useEffect, useState } from 'react';

const LeadsReport = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/leads');
                const data = await response.json();
                // Process and set the lead data
                setLeads(data);
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };

        fetchLeads();
    }, []);

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
                            <tr key={lead.lead_id} className={`hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                <td className="px-4 py-2 text-sm font-medium text-gray-900">{lead.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{lead.email}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{new Date(lead.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{lead.duration}</td>
                                <td className={`px-4 py-2 text-sm font-medium ${lead.status === 'Lost Lead' ? 'text-red-600' : 'text-green-600'}`}>
                                    {lead.status || 'N/A'}
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
