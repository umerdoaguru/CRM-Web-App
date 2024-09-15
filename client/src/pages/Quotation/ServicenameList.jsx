import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ServicenameList() {
  const [serviceList, SetServiceList] = useState([]);

  const fetchServicelist = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/servicelist`);
      if (response.status === 200) {
        SetServiceList(response.data);
      }
    } catch (error) {
      console.log('Error fetching ServiceList', error);
    }
  };

  useEffect(() => {
    fetchServicelist();
  }, []);

  return (
    <>
      <Link
        to="/quotation-section"
        className="btn bg-green-500 hover:bg-green-600 text-white mt-3 mx-2 py-2 px-4 rounded"
      >
        <i className="bi bi-arrow-return-left"></i> Back
      </Link>
      <div className="container mx-auto mt-3 mb-4">
        <h2 className="text-2xl font-bold">List of Service Name</h2>
        <ul
          className="list-none mt-4 overflow-y-auto"
          style={{ maxHeight: '700px' }}
        >
          {serviceList.map((service) => (
            <li
              key={service.service_id}
              className="border-b border-gray-300 py-2 px-4 bg-white hover:bg-gray-100 rounded"
            >
              {service.service_name}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex space-x-2">
          <Link
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            to="/create-servicelist"
          >
            Add
          </Link>
          <Link
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            to="/update-servicename"
          >
            Edit
          </Link>
          <Link
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            to="/delete-servicename"
          >
            Delete
          </Link>
        </div>
      </div>
    </>
  );
}

export default ServicenameList;
