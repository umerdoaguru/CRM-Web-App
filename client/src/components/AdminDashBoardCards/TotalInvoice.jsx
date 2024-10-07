import React, { useEffect, useState } from "react";
import MainHeader from "../MainHeader";
import Sider from "../Sider";
import axios from "axios";
import moment from "moment";
import Pagination from "../../adiComponent/comp/pagination";
import { Link } from "react-router-dom";

function TotalInvoice() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          `https://crmdemo.vimubds5.a2hosted.com/api/invoice-data`
        );
        setInvoices(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  // Filter invoices based on the search query
  const filteredInvoices = invoices.filter((invoice) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return invoice.invoice_name.toLowerCase().includes(lowercasedQuery);
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  // Get current invoices for the current page
  const currentInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <MainHeader />
      <Sider />
      <div className="container">
        <h1 className="text-2xl text-center mt-[5rem]">Total Invoices</h1>
        <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0 xl:ml-[160px]">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          placeholder="Search invoice name..."
          className="w-full lg:w-1/3 p-2 border rounded-lg border-gray-300"
        />
      </div>
      <div className="container">
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="border border-gray-200 px-4 py-2">ID</th>
                <th className="border border-gray-200 px-4 py-2">
                  Invoice Name
                </th>
                <th className="border border-gray-200 px-4 py-2">
                  Invoice Number
                </th>
                <th className="border border-gray-200 px-4 py-2">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice, index) => (
                <tr key={invoice.invoice_id} className="border-b">
                  <td className="border border-gray-200 px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {invoice.invoice_name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {invoice.invoice_no}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {moment(invoice.created_date).format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {/* Placeholder for Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredInvoices.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default TotalInvoice;
