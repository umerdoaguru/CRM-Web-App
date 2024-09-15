// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// // Helper function to generate dates for the past 30 days
// const generateLast30DaysData = () => {
//   const data = [];
//   const today = new Date();
//   for (let i = 0; i < 28; i++) {
//     const date = new Date();
//     date.setDate(today.getDate() - i);
//     const formattedDate = date.toISOString().split('T')[0];
//     data.push({
//       date: formattedDate,
//       Leads: Math.floor(Math.random() * 50) + 1, // Random leads count for example
//     });
//   }
//   return data.reverse(); // Reverse to show the most recent dates first
// };

// const LeadsGraph = () => {
//   const leadsData = generateLast30DaysData();

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 border rounded-lg shadow-md bg-white">
//       <h2 className="text-xl font-bold mb-2">Daily Leads Overview</h2>
//       <p className="text-sm text-gray-500 mb-4">Leads for the past 28 days</p>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={leadsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis dataKey="date" tick={{ fill: 'gray' }} angle={360} textAnchor="end" />
//           <YAxis tick={{ fill: 'gray' }} />
//           <Tooltip />
//           <Bar dataKey="Leads" name="Leads" fill="#EA6A47" radius={[10, 10, 0, 0]} barSize={15} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LeadsGraph;


import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const LeadsGraph = () => {
  const [leadsData, setLeadsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/leads');
        const allLeads = response.data;
  
        // Get today's date and the date 28 days ago (to include today and 27 previous days)
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 28);
  
        // Convert dates to YYYY-MM-DD format for comparison
        const formatDate = (date) => date.toISOString().split('T')[0];
        const startDateString = formatDate(startDate);
        const todayString = formatDate(today);
  
        // Filter the data for the last 28 days including today
        const filteredLeads = allLeads.filter(lead => {
          // Extract the date part from `createdTime` and ensure it matches the date format
          const leadDate = new Date(lead.createdTime).toISOString().split('T')[0];
          return leadDate >= startDateString && leadDate <= todayString;
        });
  
        // Group by date
        const groupedLeads = filteredLeads.reduce((acc, lead) => {
          const date = formatDate(new Date(lead.createdTime));
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += 1; // Count the number of leads per day
          return acc;
        }, {});
  
        // Convert to array format for Recharts
        const leadsData = Object.keys(groupedLeads).map(date => ({
          createdDate: date,
          Leads: groupedLeads[date],
        }));
  
        // Sort the data in ascending order by date
        leadsData.sort((a, b) => new Date(a.createdDate) + new Date(b.createdDate));
  
        // Ensure that all dates in the range are represented
        const allDates = [];
        for (let i = 0; i <= 28; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const formattedDate = formatDate(date);
          allDates.push({
            createdDate: formattedDate,
            Leads: groupedLeads[formattedDate] || 0, // Default to 0 if no data for that day
          });
        }
  
        // Reverse to display the most recent dates first
        allDates.reverse();
        
        setLeadsData(allDates);
      } catch (error) {
        console.error('Error fetching leads data:', error);
        setError('Failed to load leads data');
      }
    };
  
    fetchLeadsData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Daily Leads Overview</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">Leads for the past 28 days</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="createdDate" tick={{ fill: 'gray' }} angle={360} textAnchor="end" />
              <YAxis tick={{ fill: 'gray' }} />
              <Tooltip />
              <Bar dataKey="Leads" name="Leads" fill="#EA6A47" radius={[10, 10, 0, 0]} barSize={15} />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default LeadsGraph;





