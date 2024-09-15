


// import React, { useState } from 'react';
// import Header from '../components/MainHeader';
// import Sider from '../components/Sider';
// import moment from 'moment';

// function Leads() {
//     const [leads, setLeads] = useState([
//         { id: 1, leadNumber: "12345", assignedTo: "John Doe", createdTime: "01-01-2023", name: "Jane Smith", phone: "8587484575", leadSource: "Facebook" },
//         { id: 2, leadNumber: "67890", assignedTo: "Alice Brown", createdTime: "02-01-2023", name: "Bob Johnson", phone: "1234567890", leadSource: "LinkedIn" },
//         // Add more leads as needed
//     ]);
//     const [showPopup, setShowPopup] = useState(false);
//     const [currentLead, setCurrentLead] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);

//     // Create Lead Logic
//     const handleCreateClick = () => {
//         setCurrentLead({
//             id: leads.length + 1, // Set a new ID
//             leadNumber: "",
//             assignedTo: "",
//             createdTime: "",
//             name: "",
//             phone: "",
//             leadSource: ""
//         });
//         setIsEditing(false); // This is for creating a new lead
//         setShowPopup(true); // Show the popup
//     };

//     // Edit Lead Logic
//     const handleEditClick = (lead) => {
//         setCurrentLead(lead); // Set the lead data for editing
//         setIsEditing(true); // This is for editing an existing lead
//         setShowPopup(true); // Show the popup
//     };
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentLead({ ...currentLead, [name]: value });
//     };

//     // Save Changes Logic
//     const saveChanges = () => {
//         if (isEditing) {
//             // Update existing lead
//             setLeads(leads.map(lead => (lead.id === currentLead.id ? currentLead : lead)));
//         } else {
//             // Add new lead
//             setLeads([...leads, currentLead]);
//         }
//         setShowPopup(false); // Close the popup
//     };

//     // Delete Lead Logic
//     const handleDeleteClick = (id) => {
//         if (window.confirm("Are you sure you want to delete this data?")) {
//             setLeads(leads.filter(lead => lead.id !== id));
//         }
//     };
   

//     // Close the popup
//     const closePopup = () => {
//         setShowPopup(false);
//         setCurrentLead(null);
//     };

//     return (
//         <>
//             <Header />
//             <Sider />
//             <div className="container">
//                 <h1 className="text-2xl text-center mt-[2rem]">Leads Management</h1>
//                 <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>
                
//                 {/* Button to create a new lead */}
//                 <div className="mb-4">
//                     <button
//                         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
//                         onClick={handleCreateClick}
//                     >
//                         Add Lead
//                     </button>
//                 </div>

//                 <div className="overflow-x-auto mt-4">
//                     <table className="min-w-full bg-white border">
//                         <thead>
//                             <tr>
//                                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">S.no</th>
//                                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Lead Number</th>
//                                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Assigned To</th>
//                                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Created Time</th>
//                                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Name</th>
//                                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Phone</th>
//                                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Lead Source</th>
//                                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {leads.map((lead, index) => (
//                                 <tr key={lead.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
//                                     <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.id}</td>
//                                     <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.leadNumber}</td>
//                                     <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.assignedTo}</td>
//                                     <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{moment(lead.createdTime).format('DD/MM/YYYY')}</td>
//                                     <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.name}</td>
//                                     <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.phone}</td>
//                                     <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.leadSource}</td>
//                                     <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
//                                         <button
//                                             className="text-blue-500 hover:text-blue-700"
//                                             onClick={() => handleEditClick(lead)}
//                                         >
//                                             Edit
//                                         </button> | 
//                                         <button
//                                             className="text-red-500 hover:text-red-700"
//                                             onClick={() => handleDeleteClick(lead.id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Popup */}
//                 {showPopup && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-h-[100vh] overflow-auto mx-4 my-5">
//                             <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Lead" : "Add Lead"}</h2>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Lead Number</label>
//                                 <input
//                                     type="text"
//                                     name="leadNumber"
//                                     value={currentLead.leadNumber}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Assigned To</label>
//                                 <input
//                                     type="text"
//                                     name="assignedTo"
//                                     value={currentLead.assignedTo}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Created Time</label>
//                                 <input
//                                     type="date"
//                                     name="createdTime"
//                                     value={currentLead.createdTime}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={currentLead.name}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Phone</label>
//                                 <input
//                                     type="text"
//                                     name="phone"
//                                     value={currentLead.phone}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Lead Source</label>
//                                 <input
//                                     type="text"
//                                     name="leadSource"
//                                     value={currentLead.leadSource}
//                                     onChange={handleInputChange}
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                             <div className="flex justify-end">
//                                 <button
//                                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                                     onClick={saveChanges}
//                                 >
//                                     Save
//                                 </button>
//                                 <button
//                                     className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-700"
//                                     onClick={closePopup}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

// export default Leads;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/MainHeader';
import Sider from '../components/Sider';
import moment from 'moment';
import FormField from '../adiComponent/comp/updateLeadField';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
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
  
function Leads() {
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
            `http://localhost:9000/api/employe-leads/${1}`
          );
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
            <Header />
            <Sider />
            <div className="container">
                <h1 className="text-2xl text-center mt-[2rem]">Assigned Leads</h1>
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
                   <FormField
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

export default Leads;






