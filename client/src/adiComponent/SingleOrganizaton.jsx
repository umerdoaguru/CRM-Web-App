import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleOrganization = () => {
  const { id } = useParams(); 
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/v1/getOrganization/${id}`);
      setOrganization(response.data.organization);
    } catch (error) {
      console.error('Error fetching organization:', error);
    }
  };

  if (!organization) {
    return <div>Loading...</div>; // Show loading while fetching organization details
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{organization.name}</h2>
          <img
            src={organization.logo ? `${organization.logo}` : '/default-logo.png'}
            alt="Company Logo"
            className="object-cover w-24 h-24 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Contact:</h4>
          <p>{organization.contact}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Bank Details:</h4>
          <pre className="p-4 bg-gray-100 rounded-lg">{organization.bankDetails}</pre>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Signature:</h4>
          {organization.signature ? (
            <img src={`${organization.signature}`} alt="Signature" className="w-32 h-32" />
          ) : (
            <p>No Signature Available</p>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-white transition duration-200 bg-gray-500 rounded-lg shadow-lg hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleOrganization;
