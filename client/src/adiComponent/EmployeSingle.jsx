import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsPencilSquare, BsTrash, BsPlusCircle } from 'react-icons/bs';
import Modal from '../adiComponent/Modal';
import Sider from '../components/Sider';

const EmployeeSingle = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    designation: '',
    signature: null,
    photo: null,
    timing: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/v1/getEmployeeById/${employeeId}`);
        if (response.data.success) {
          setEmployee(response.data.employee);
          setNewEmployee({
            name: response.data.employee.name,
            email: response.data.employee.email,
            position: response.data.employee.position,
            phone: response.data.employee.phone,
            designation: response.data.employee.designation,
            signature: null,
            photo: null,
            timing: response.data.employee.timing,
          });
        } else {
          console.error('Failed to fetch employee');
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e, field) => {
    setNewEmployee((prev) => ({ ...prev, [field]: e.target.files[0] }));
  };

  const handleSaveEmployee = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newEmployee.name);
      formData.append('email', newEmployee.email);
      formData.append('position', newEmployee.position);
      formData.append('phone', newEmployee.phone);
      formData.append('designation', newEmployee.designation);
      formData.append('timing', newEmployee.timing);
  
      if (newEmployee.signature) {
        formData.append('signature', newEmployee.signature);
      }
  
      if (newEmployee.photo) {
        formData.append('photo', newEmployee.photo);
      }
  
      if (editingIndex !== null) {
        const response = await axios.put(`http://localhost:9000/api/v1/updateSingleEmployee/${employee.employeeId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.success) {
          setEmployee((prev) => ({ ...newEmployee, employeeId: prev.employeeId }));
          setEditingIndex(null);
        } else {
          console.error('Failed to update employee');
        }
      } else {
        const response = await axios.post('http://localhost:9000/api/v1/addEmployee', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          console.error('Failed to add employee');
        }
      }
  
      setNewEmployee({
        name: '',
        email: '',
        position: '',
        phone: '',
        designation: '',
        signature: null,
        photo: null,
        timing: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };
  

  const handleEditEmployee = () => {
    if (employee) {
      setNewEmployee({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        phone: employee.phone,
        designation: employee.designation,
        signature: null,
        photo: null,
        timing: employee.timing,
      });
      setEditingIndex(0);
      setShowForm(true);
    }
  };

  const handleDeleteEmployee = async () => {
    if (employee) {
      try {
        await axios.delete(`http://localhost:9000/api/v1/deleteEmployee/${employee.employeeId}`);
        setEmployee(null);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <div className="lg:w-64">
        <Sider />
      </div>
      <main className="flex-1 p-4 lg:p-8">
        <div className="flex flex-col-reverse items-start justify-between mb-8 lg:flex-row lg:items-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 lg:mb-0">Employee Management</h2>
          <button
            onClick={() => { handleEditEmployee(); }}
            className="flex items-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
          >
            <BsPlusCircle className="mr-2" /> Edit Employee
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="text-sm font-semibold text-left text-gray-600 uppercase bg-gray-200">
                <th className="px-4 py-3 sm:px-6">Name</th>
                <th className="px-4 py-3 sm:px-6">Email</th>
                <th className="px-4 py-3 sm:px-6">Position</th>
                <th className="px-4 py-3 sm:px-6">Phone</th>
                <th className="px-4 py-3 sm:px-6">Designation</th>
                <th className="px-4 py-3 sm:px-6">Signature</th>
                <th className="px-4 py-3 sm:px-6">Photo</th>
                <th className="px-4 py-3 sm:px-6">Timing</th>
                <th className="px-4 py-3 sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee ? (
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-4 py-4 sm:px-6">{employee.name}</td>
                  <td className="px-4 py-4 sm:px-6">{employee.email}</td>
                  <td className="px-4 py-4 sm:px-6">{employee.position}</td>
                  <td className="px-4 py-4 sm:px-6">{employee.phone}</td>
                  <td className="px-4 py-4 sm:px-6">{employee.designation}</td>
                  <td className="px-4 py-4 sm:px-6">
                    {employee.signature ? (
                      <img src={`http://localhost:9000${employee.signature}`} alt="Signature" className="w-12 h-12" />
                    ) : 'No Signature'}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    {employee.photo ? (
                      <img src={`http://localhost:9000${employee.photo}`} alt="Photo" className="w-12 h-12 rounded-full" />
                    ) : 'No Photo'}
                  </td>
                  <td className="px-4 py-4 sm:px-6">{employee.timing}</td>
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex space-x-2 sm:space-x-4">
                      <button
                        onClick={() => handleEditEmployee()}
                        className="text-blue-500 transition duration-200 hover:text-blue-600"
                      >
                        <BsPencilSquare size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee()}
                        className="text-red-500 transition duration-200 hover:text-red-600"
                      >
                        <BsTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="9" className="py-4 text-center">No employee found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
          <h3 className="mb-4 text-lg font-bold">{editingIndex !== null ? "Edit Employee" : "Add Employee"}</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="position"
              value={newEmployee.position}
              onChange={handleInputChange}
              placeholder="Position"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="phone"
              value={newEmployee.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="designation"
              value={newEmployee.designation}
              onChange={handleInputChange}
              placeholder="Designation"
              className="p-2 border rounded-lg"
            />
            <input
              type="file"
              onChange={(e) => handleFileInput(e, 'signature')}
              className="p-2 border rounded-lg"
            />
            <input
              type="file"
              onChange={(e) => handleFileInput(e, 'photo')}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="timing"
              value={newEmployee.timing}
              onChange={handleInputChange}
              placeholder="Timing"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEmployee}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default EmployeeSingle;
