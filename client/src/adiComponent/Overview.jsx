import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencilSquare, BsTrash, BsPlusCircle } from 'react-icons/bs';
import Sider from '../components/Sider';
import Modal from '../adiComponent/Modal';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    contact: '',
    bankDetails: '',
    signature: null,
    logo: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/getOrganization');
      const { organizations } = response.data;
      setCompanies(organizations);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e, field) => {
    setNewCompany((prev) => ({ ...prev, [field]: e.target.files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!newCompany.name) newErrors.name = 'Company Name is required';

    // Validate Contact
    if (!newCompany.contact) newErrors.contact = 'Contact No is required';
    else if (!/^\d{10}$/.test(newCompany.contact)) newErrors.contact = 'Contact No must be a 10-digit number';

    // Validate Bank Details
    if (!newCompany.bankDetails) newErrors.bankDetails = 'Bank Details are required';

    // Validate Signature
    if (!newCompany.signature) newErrors.signature = 'Signature is required';

    // Validate Logo
    if (!newCompany.logo) newErrors.logo = 'Logo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCompany = async () => {
    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      const formData = new FormData();
      formData.append('name', newCompany.name);
      formData.append('contact', newCompany.contact);
      formData.append('bankDetails', JSON.stringify(newCompany.bankDetails));

      if (newCompany.signature) formData.append('signature', newCompany.signature);
      if (newCompany.logo) formData.append('logo', newCompany.logo);

      if (editingIndex !== null) {
        const companyId = companies[editingIndex].companyId;
        await axios.put(`http://localhost:9000/api/v1/updateOrganization/${companyId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const updatedCompanies = [...companies];
        updatedCompanies[editingIndex] = { ...newCompany, companyId };
        setCompanies(updatedCompanies);
        setEditingIndex(null);
      } else {
        await axios.post('http://localhost:9000/api/v1/addOrganization', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setCompanies((prev) => [...prev, { ...newCompany, companyId: Date.now() }]);
      }

      setNewCompany({
        name: '',
        contact: '',
        bankDetails: '',
        signature: null,
        logo: null,
      });
      setShowForm(false);
      setErrors({});
      fetchCompanies();
    } catch (error) {
      console.error('Error saving company:', error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    setNewCompany({
      name: '',
      contact: '',
      bankDetails: '',
      signature: null,
      logo: null,
    });
    setEditingIndex(null);
    setShowForm(false);
    setErrors({});
  };

  const handleEditCompany = (index) => {
    const companyToEdit = companies[index];
    setNewCompany({
      name: companyToEdit.name,
      contact: companyToEdit.contact,
      bankDetails: companyToEdit.bankDetails,
      signature: null, // File inputs won't be prefilled
      logo: null, // File inputs won't be prefilled
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteCompany = async (companyId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this organization?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/v1/deleteOrganization/${companyId}`);
        setCompanies(companies.filter((company) => company.companyId !== companyId));
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  const handleViewCompany = (companyId) => {
    navigate(`/singleOrganization/${companyId}`);
  };

  return (
    <div className="flex min-h-screen">
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
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                  onClick={() => handleViewCompany(company.companyId)}
                >
                  <td className="px-4 py-4 sm:px-6">{company.name}</td>
                  <td className="px-4 py-4 sm:px-6">{company.contact}</td>
                  <td className="px-4 py-4 sm:px-6">{company.bankDetails}</td>
                  <td className="px-4 py-4 sm:px-6">
                    {company.signature ? <img src={`${company.signature}`} alt="Signature" className="w-12 h-12" /> : 'No Signature'}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {company.logo ? <img src={`${company.logo}`} alt="Company Logo" className="object-cover w-12 h-12" /> : 'No Logo'}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex space-x-2 sm:space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCompany(index);
                        }}
                        className="text-blue-500 transition duration-200 hover:text-blue-600"
                      >
                        <BsPencilSquare size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCompany(company.companyId);
                        }}
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

        <Modal isOpen={showForm} onClose={handleCancel}>
          <h3 className="mb-4 text-lg font-bold">{editingIndex !== null ? "Edit Organization" : "Add Organization"}</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={newCompany.name}
              onChange={handleInputChange}
              placeholder="Company Name"
              className={`p-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            <input
              type="text"
              name="contact"
              value={newCompany.contact}
              onChange={handleInputChange}
              placeholder="Contact No"
              className={`p-2 border rounded-lg ${errors.contact ? 'border-red-500' : ''}`}
            />
            {errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}
            <textarea
              name="bankDetails"
              value={newCompany.bankDetails}
              onChange={handleInputChange}
              placeholder="Bank Details"
              className={`p-2 border rounded-lg ${errors.bankDetails ? 'border-red-500' : ''}`}
            />
            {errors.bankDetails && <p className="text-sm text-red-500">{errors.bankDetails}</p>}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileInput(e, 'signature')}
              className={`p-2 border rounded-lg ${errors.signature ? 'border-red-500' : ''}`}
            />
            {errors.signature && <p className="text-sm text-red-500">{errors.signature}</p>}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileInput(e, 'logo')}
              className={`p-2 border rounded-lg ${errors.logo ? 'border-red-500' : ''}`}
            />
            {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-500 transition duration-200 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCompany}
              className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default Overview;
