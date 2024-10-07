import axios from "axios";
import React, { useEffect, useState } from "react";
import MainHeader from "../MainHeader";
import Sider from "../Sider";
import { useNavigate } from "react-router-dom";
import Pagination from "../../adiComponent/comp/pagination";

function TotalEmployee() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define items per page

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://crmdemo.vimubds5.a2hosted.com/api/getAllEmployees"
      );
      const { employees } = response.data;
      setEmployees(employees || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEmployeeClick = (employeeId) => {
    navigate(`/employee-single/${employeeId}`);
  };

  // Filter employees based on the search query
  const filteredEmployees = employees.filter((employee) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return employee.name.toLowerCase().includes(lowercasedQuery);
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  // Get current employees for the current page
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <MainHeader />
      <Sider />
      <div className="container">
        <h1 className="text-2xl text-center mt-[5rem]">Total Employees</h1>
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
      <div className="overflow-x-auto mt-4 xl:ml-[160px] rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-sm font-semibold text-left text-gray-600 uppercase bg-gray-200">
              <th className="px-4 py-3 sm:px-6">Name</th>
              <th className="px-4 py-3 sm:px-6">Email</th>
              <th className="px-4 py-3 sm:px-6">Role</th>
              <th className="px-4 py-3 sm:px-6">Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr
                  key={employee.employeeId}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleEmployeeClick(employee.employeeId)}
                >
                  <td className="px-4 py-4 sm:px-6">{employee.name}</td>
                  <td className="px-4 py-4 sm:px-6">{employee.email}</td>
                  <td className="px-4 py-4 sm:px-6">{employee.position}</td>
                  <td className="px-4 py-4 sm:px-6">{employee.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredEmployees.length} // Use length for total items
          itemsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}

export default TotalEmployee;
