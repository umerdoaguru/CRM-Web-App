import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "./../MainHeader";
import Sider from "../Sider";
import Pagination from "../../adiComponent/comp/pagination";

function TotalLead() {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(
        "https://crmdemo.vimubds5.a2hosted.com/api/leads"
      );
      setLeads(response.data || []); // Ensure leads is always an array
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // -1 navigates to the previous page in history
  };

  // Filter leads based on the search query
  const filteredTotalLeads = leads.filter((lead) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return lead.name.toLowerCase().includes(lowercasedQuery); // Correctly filter by name
  });

  return (
    <>
      <MainHeader />
      <Sider />

      <div className="container ">
        <h1 className="text-2xl text-center mt-[5rem]">Total Leads </h1>
        <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0 xl:ml-[160px]">
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          placeholder="Search lead name..."
          className="w-full lg:w-1/3 p-2 border rounded-lg border-gray-300"
        />
      </div>

      <div className="overflow-x-auto mt-4 xl:ml-[160px]">
        <table className="min-w-full max-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                S.no
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Lead Number
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Lead Source
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Lead Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Created Time
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTotalLeads.map((lead, index) => (
              <tr
                key={lead.lead_id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                  {index + 1}
                </td>
                <Link to={`/lead-single-data/${lead.lead_id}`}>
                  <td className="px-6 py-4 border-b border-gray-200 underline text-[blue]">
                    {lead.lead_no}
                  </td>
                </Link>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                  {lead.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                  {lead.phone}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                  {lead.leadSource}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                  {lead.assignedTo}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                  {lead.subject}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                  {lead.lead_status}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                  {moment(lead.createdTime).format("YYYY-MM-DD")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalItems={filteredTotalLeads.length}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default TotalLead;
