import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper function to generate dates for the past 30 days
const generateLast30DaysData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 28; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    data.push({
      date: formattedDate,
      Leads: Math.floor(Math.random() * 50) + 1, // Random leads count for example
    });
  }
  return data.reverse(); // Reverse to show the most recent dates first
};

const LeadsGraph = () => {
  const leadsData = generateLast30DaysData();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Daily Leads Overview</h2>
      <p className="text-sm text-gray-500 mb-4">Leads for the past 28 days</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={leadsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: 'gray' }} angle={360} textAnchor="end" />
          <YAxis tick={{ fill: 'gray' }} />
          <Tooltip />
          <Bar dataKey="Leads" name="Leads" fill="#EA6A47" radius={[10, 10, 0, 0]} barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadsGraph;
