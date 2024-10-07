import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import MainHeader from "../MainHeader";
import Sider from "../Sider";
import Pagination from "../../adiComponent/comp/pagination";

function TotalQuotation() {
  const [quotations, setQuotations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await axios.get(
          `https://crmdemo.vimubds5.a2hosted.com/api/quotation-data`
        );
        setQuotations(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      }
    };

    fetchQuotations();
  }, []);

  // Filter quotations based on the search query
  const filteredQuotations = quotations.filter((quotation) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return quotation.employee_name.toLowerCase().includes(lowercasedQuery);
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);

  // Get current quotations for the current page
  const currentQuotations = filteredQuotations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <MainHeader />
      <Sider />
      <div className="container">
        <h1 className="text-2xl text-center mt-[5rem]">Total Quotations</h1>
        <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0 xl:ml-[160px]">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          placeholder="Search employee name..."
          className="w-full lg:w-1/3 p-2 border rounded-lg border-gray-300"
        />
      </div>

      <div className="container">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quotation Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentQuotations.map((quotation, index) => (
              <tr key={quotation.quotation_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {quotation.employeeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {quotation.employee_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {quotation.quotation_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(quotation.created_date).format("DD/MM/YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredQuotations.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default TotalQuotation;
