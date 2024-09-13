import React, { useState, useEffect } from 'react';
import { BsDownload, BsFilter } from 'react-icons/bs';
import * as XLSX from 'xlsx';

const Reporting = () => {
  const staticData = {
    quotation: [
      { id: 1, name: 'Quotation 1', date: '2024-08-12', amount: '$500', details: 'Details of Quotation 1' },
      { id: 2, name: 'Quotation 2', date: '2024-08-15', amount: '$300', details: 'Details of Quotation 2' },
    ],
    invoice: [
      { id: 1, name: 'Invoice 1', date: '2024-08-10', amount: '$1000', details: 'Details of Invoice 1' },
      { id: 2, name: 'Invoice 2', date: '2024-08-20', amount: '$2000', details: 'Details of Invoice 2' },
    ],
    employee: [
      { id: 1, name: 'Employee 1', date: '2024-08-11', amount: '$1200', details: 'Details of Employee 1' },
      { id: 2, name: 'Employee 2', date: '2024-08-21', amount: '$1300', details: 'Details of Employee 2' },
    ],
    user: [
      { id: 1, name: 'User 1', date: '2024-08-14', amount: '$400', details: 'Details of User 1' },
      { id: 2, name: 'User 2', date: '2024-08-19', amount: '$600', details: 'Details of User 2' },
    ],
  };

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('quotation');

  useEffect(() => {
    filterData();
  }, [selectedCategory, filter]);

  const filterData = () => {
    const filteredData = staticData[selectedCategory].filter((item) => {
      const currentDate = new Date();
      const itemDate = new Date(item.date);
      let filterCondition = false;

      if (filter === 'week') {
        const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
        filterCondition = itemDate >= oneWeekAgo;
      } else if (filter === 'month') {
        const oneMonthAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        filterCondition = itemDate >= oneMonthAgo;
      } else if (filter === 'year') {
        const oneYearAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
        filterCondition = itemDate >= oneYearAgo;
      }

      return filterCondition;
    });

    setData(filteredData);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDownload = () => {
    // Convert data to Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${selectedCategory}-${filter}-data.xlsx`);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 lg:p-8">
      <div className="flex justify-between mb-8">
        <div className="flex space-x-4">
          {['quotation', 'invoice', 'employee', 'user'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center p-2 bg-gray-100 border rounded-lg">
            <BsFilter className="mr-2" />
            <select value={filter} onChange={handleFilterChange} className="bg-transparent border-none outline-none">
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            <BsDownload className="mr-2" /> Download
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-sm font-semibold text-left text-gray-600 uppercase bg-gray-200">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3">{item.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reporting;
