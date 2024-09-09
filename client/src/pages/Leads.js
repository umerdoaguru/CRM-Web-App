


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

function Leads() {
    const [leads, setLeads] = useState([]);
    const [currentLead, setCurrentLead] = useState({
        lead_no: '',
        assignedTo: '',
        createdTime: '',
        name: '',
        phone: '',
        leadSource: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    // Fetch leads from the API
    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/leads');
            setLeads(response.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!currentLead.lead_no) {
            formErrors.lead_no = 'Lead number is required';
            isValid = false;
        }

        if (!currentLead.assignedTo) {
            formErrors.assignedTo = 'Assigned To field is required';
            isValid = false;
        }

        if (!currentLead.name) {
            formErrors.name = 'Name is required';
            isValid = false;
        }

        if (!currentLead.phone) {
            formErrors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(currentLead.phone)) {
            formErrors.phone = 'Phone number must be 10 digits';
            isValid = false;
        }

        if (!currentLead.leadSource) {
            formErrors.leadSource = 'Lead Source is required';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
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

    const handleEditClick = (lead) => {
        setIsEditing(true);
        setCurrentLead(lead);
        setShowPopup(true);
    };

    const saveChanges = async () => {
        if (validateForm()) {
            if (isEditing) {
                // Update lead
                try {
                    await axios.put(`http://localhost:9000/api/leads/${currentLead.id}`, currentLead);
                    fetchLeads(); // Refresh the list
                    closePopup();
                } catch (error) {
                    console.error('Error updating lead:', error);
                }
            } else {
                // Create new lead
                try {
                    await axios.post('http://localhost:9000/api/leads', currentLead);
                    fetchLeads(); // Refresh the list
                    closePopup();
                } catch (error) {
                    console.error('Error adding lead:', error);
                }
            }
        }
    };

    const handleDeleteClick = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this data?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:9000/api/leads/${id}`);
                fetchLeads(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting lead:', error);
            }
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setErrors({});
    };

    return (
        <>
            <Header />
            <Sider />
            <div className="container">
                <h1 className="text-2xl text-center mt-[2rem]">Leads Management</h1>
                <div className="mx-auto h-[3px] w-16 bg-[#34495E] my-3"></div>

                {/* Button to create a new lead */}
                <div className="mb-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={handleCreateClick}
                    >
                        Add Lead
                    </button>
                </div>

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
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.lead_no}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.assignedTo}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{moment(lead.createdTime).format('DD/MM/YYYY')}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.phone}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">{lead.leadSource}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleEditClick(lead)}
                                        >
                                            Edit
                                        </button> | 
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteClick(lead.id)}
                                        >
                                            Delete
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
                            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Lead" : "Add Lead"}</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">Lead Number</label>
                                <input
                                    type="number"
                                    name="lead_no"
                                    value={currentLead.lead_no}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.lead_no && <p className="text-red-500 text-xs">{errors.lead_no}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Assigned To</label>
                                <input
                                    type="text"
                                    name="assignedTo"
                                    value={currentLead.assignedTo}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.assignedTo && <p className="text-red-500 text-xs">{errors.assignedTo}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={currentLead.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Phone</label>
                                <input
                                    type="number"
                                    name="phone"
                                    value={currentLead.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                 
                                />
                                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Lead Source</label>
                                <input
                                    type="text"
                                    name="leadSource"
                                    value={currentLead.leadSource}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.leadSource && <p className="text-red-500 text-xs">{errors.leadSource}</p>}
                            </div>
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






