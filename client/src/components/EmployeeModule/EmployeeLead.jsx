import React, { useState, useEffect } from 'react';
import axios from 'axios';

import moment from 'moment';

import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
import MainHeader from '../MainHeader';
import EmployeeSider from './EmployeeSider';
import UpdateLeadField from './updateLeadField';
const fieldConfig = [
    {
      name: 'lead_status',
      label: 'Lead Status',
      type: 'select',
      options: [
        { value: '', label: 'Select Lead Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Done' }
      ]
    },
    {
      name: 'quotation_status',
      label: 'Quotation Status',
      type: 'select',
      options: [
        { value: '', label: 'Select Quotation Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Done' }
      ]
    },
    {
      name: 'invoice_status',
      label: 'Invoice Status',
      type: 'select',
      options: [
        { value: '', label: 'Select Invoice Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Done' }
      ]
    },
    {
      name: 'deal_status',
      label: 'Deal Status',
      type: 'select',
      options: [
        { value: '', label: 'Select Deal Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Done' }
      ]
    },
    {
      name: 'reason',
      label: 'Reason',
      type: 'textarea'
    },
    {
      name: 'lead_working_status',
      label: 'Lead Working Status',
      type: 'select',
      options: [
        { value: '', label: 'Select Lead Working Status' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' }
      ]
    },
    {
      name: 'follow_up_status',
      label: 'Follow Up Status',
      type: 'select',
      options: [
        { value: '', label: 'Select Follow Up Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Done' }
      ]
    }
  ];
  
function EmployeeLead() {
    const [leads, setLeads] = useState([]);
    const [currentLead, setCurrentLead] = useState({
        lead_status: '',
        quotation_status: '',
        invoice_status: '',
        deal_status: '',
        reason: '',
        lead_working_status: '',
        follow_up_status: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    // Fetch leads from the API
    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
          const response = await axios.get(
            `http://localhost:9000/api/employe-leads/${1}`);
          const data = response.data;
          setLeads(data);
        } catch (error) {
          console.error("Error fetching leads:", error);
        }
      };




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentLead((prevLead) => ({
            ...prevLead,
            [name]: value,
        }));
    };

    const handleCreateClick = () => {
        setIsEditing(false);
        setCurrentLead({
            lead_no: '',
            assignedTo: '',
            name: '',
            phone: '',
            leadSource: '',
        });
        setShowPopup(true);
    };

    const handleUpdate = (lead) => {
        setIsEditing(true);
        setCurrentLead(lead);
        setShowPopup(true);
    };

    const saveChanges = async () => {
        
        try {
          // Send updated data to the backend using Axios
          const response = await axios.put(`http://localhost:9000/api/updateLeadStatus/${currentLead.lead_id}`, currentLead);
      
          if (response.status === 200) {
            console.log('Updated successfully:', response.data);
            cogoToast.success({ general: 'Lead status updated successfully.' });
            closePopup();  // Close the popup on success
          } else {
            console.error('Error updating:', response.data);
            cogoToast.error({ general: 'Failed to update the lead status.' });
          }
        } catch (error) {
          console.error('Request failed:', error);
          cogoToast.error('Failed to update the lead status.');
        }
      };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <MainHeader />
            <EmployeeSider />
            <div className="container mt-16">
                <h1 className="text-2xl text-center mt-[2rem]">Assigned Employee Leads</h1>
                <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>

                {/* Button to create a new lead */}
                {/* <div className="mb-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={handleCreateClick}
                    >
                        Add Lead
                    </button>
                </div> */}

                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">S.no</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Lead Number</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Assigned To</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Created Time</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Phone</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Lead Source</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, index) => (
                                <tr key={lead.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{index + 1}</td>
                                    <Link to={`/lead-single-data/${lead.lead_id}`}>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.lead_no}</td>
                                    </Link>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.assignedTo}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{moment(lead.createdTime).format('DD/MM/YYYY')}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.phone}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.leadSource}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleUpdate(lead)}>
                                            Update
                                        </button> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Popup for Add/Edit */}
                {showPopup && (
               <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
               <div className="bg-white p-6 rounded-lg shadow-lg w-full max-h-[100vh] overflow-auto mx-4 my-5">
                 <h2 className="text-xl font-bold mb-4">{isEditing ? "Update Status" : ""}</h2>
           
                 {/* Render Form Fields */}
                 {fieldConfig.map(field => (
                   <UpdateLeadField
                     key={field.name}
                     field={field}
                     value={currentLead[field.name]}
                     onChange={handleInputChange}
                   />
                 ))}
           
                 {/* Save and Cancel Buttons */}
                 <div className="flex justify-end">
                   <button
                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                     onClick={saveChanges}
                   >
                     Save
                   </button>
                   <button
                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                     onClick={closePopup}
                   >
                     Cancel
                   </button>
                 </div>
               </div>
             </div>
                 
                )}
            </div>
        </>
    );
}

export default EmployeeLead;