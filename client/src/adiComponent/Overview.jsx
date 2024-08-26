import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPencilSquare, BsTrash, BsPlusCircle } from "react-icons/bs";
import Sider from "../components/Sider";
const Overview = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    companyId: "",
    name: "",
    contact: "",
    bankDetails: "",
    signature: "",
    logo: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/getOrganization");
      const { organizations } = response.data;
      setCompanies(organizations);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCompany = async () => {
    try {
      // Basic validation
      if (!newCompany.companyId || !newCompany.name) {
        console.error("Company ID and Name are required");
        return;
      }
  
      if (editingIndex !== null) {
        // Edit existing company
        const companyId = companies[editingIndex].companyId;
        await axios.put(`http://localhost:9000/api/v1/updateOrganization/${companyId}`, newCompany);
        const updatedCompanies = [...companies];
        updatedCompanies[editingIndex] = newCompany;
        setCompanies(updatedCompanies);
        setEditingIndex(null);
      } else {
        // Add a new company
        await axios.post("http://localhost:9000/api/v1/addOrganization", newCompany);
        setCompanies((prev) => [...prev, newCompany]);
      }
      setNewCompany({
        companyId: "",
        name: "",
        contact: "",
        bankDetails: "",
        signature: "",
        logo: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving company:", error.response?.data || error.message);
    }
  };
  

  const handleEditCompany = (index) => {
    const companyToEdit = companies[index];
    setNewCompany(companyToEdit);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/deleteOrganization/${companyId}`);
      setCompanies(companies.filter((company) => company.companyId !== companyId));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div>
      </div>
      <Sider />
      <main className="flex-1 p-6 ml-0 lg:p-8 lg:ml-64 xl:ml-80">
        <div className="flex flex-col items-start justify-between mb-8 lg:flex-row lg:items-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 lg:mb-0">Organization Management</h2>
          <button
            onClick={() => { setShowForm(true); setEditingIndex(null); }}
            className="flex items-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
          >
            <BsPlusCircle className="mr-2" /> Add Organization
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-sm font-semibold text-left text-gray-600 uppercase bg-gray-200">
                <th className="px-4 py-3 sm:px-6">Company ID</th>
                <th className="px-4 py-3 sm:px-6">Name</th>
                <th className="px-4 py-3 sm:px-6">Contact No</th>
                <th className="px-4 py-3 sm:px-6">Bank Details</th>
                <th className="px-4 py-3 sm:px-6">Signature</th>
                <th className="px-4 py-3 sm:px-6">Logo</th>
                <th className="px-4 py-3 sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(companies) && companies.map((company, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-4 sm:px-6">{company.companyId}</td>
                  <td className="px-4 py-4 sm:px-6">{company.name}</td>
                  <td className="px-4 py-4 sm:px-6">{company.contact}</td>
                  <td className="px-4 py-4 sm:px-6">{company.bankDetails}</td>
                  <td className="px-4 py-4 sm:px-6">{company.signature}</td>
                  <td className="px-4 py-4 sm:px-6">
                    <img src={company.logo} alt="Company Logo" className="object-cover w-12 h-12" />
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex space-x-2 sm:space-x-4">
                      <button
                        onClick={() => handleEditCompany(index)}
                        className="text-blue-500 transition duration-200 hover:text-blue-600"
                      >
                        <BsPencilSquare size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.companyId)}
                        className="text-red-500 transition duration-200 hover:text-red-600"
                      >
                        <BsTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="p-4 mt-8 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-lg font-bold">{editingIndex !== null ? "Edit Organization" : "Add Organization"}</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <input
                type="text"
                name="companyId"
                value={newCompany.companyId}
                onChange={handleInputChange}
                placeholder="Company ID"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="name"
                value={newCompany.name}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="contact"
                value={newCompany.contact}
                onChange={handleInputChange}
                placeholder="Contact No"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="bankDetails"
                value={newCompany.bankDetails}
                onChange={handleInputChange}
                placeholder="Bank Details"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="signature"
                value={newCompany.signature}
                onChange={handleInputChange}
                placeholder="Signature"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="logo"
                value={newCompany.logo}
                onChange={handleInputChange}
                placeholder="Logo URL"
                className="p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveCompany}
                className="px-4 py-2 text-white transition duration-200 bg-green-500 rounded-lg shadow-lg hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 ml-4 text-white transition duration-200 bg-red-500 rounded-lg shadow-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Overview;
