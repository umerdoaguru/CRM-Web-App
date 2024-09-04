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
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

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

      let response;
      if (editingIndex !== null) {
        response = await axios.put(`http://localhost:9000/api/v1/updateSingleEmployee/${employee.employeeId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axios.post('http://localhost:9000/api/v1/addEmployee', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (response.data.success) {
        if (editingIndex !== null) {
          setEmployee(prev => ({ ...prev, ...newEmployee }));
        } else {
          setEmployee(response.data.employee);
        }
        setShowForm(false);
      } else {
        console.error('Failed to save employee');
      }
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
      const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
      if (isConfirmed) {
        try {
          await axios.delete(`http://localhost:9000/api/v1/deleteEmployee/${employee.employeeId}`);
          setEmployee(null);
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <div className="lg:w-64">
        <Sider />
      </div>
      <main className="flex-1 p-4 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Employee Profile</h2>
          <button
            onClick={handleEditEmployee}
            className="flex items-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
          >
            <BsPencilSquare className="mr-2" /> Edit Profile
          </button>
        </div>

        {employee ? (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              {employee.photo ? (
                <img
                  src={`http://localhost:9000${employee.photo}`}
                  alt="Profile"
                  className="w-24 h-24 border-2 border-gray-300 rounded-full"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 border-2 border-gray-300 rounded-full"></div>
              )}
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-800">{employee.name}</h3>
                <p className="text-gray-600">{employee.position}</p>
                <p className="text-gray-600">{employee.email}</p>
                <p className="text-gray-600">{employee.phone}</p>
                <p className="text-gray-600">{employee.designation}</p>
                <p className="text-gray-600">{employee.timing}</p>
              </div>
            </div>

            {employee.signature && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800">Signature</h4>
                <img
                  src={`http://localhost:9000${employee.signature}`}
                  alt="Signature"
                  className="w-32 h-16 border-t border-gray-300"
                />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteEmployee}
                className={`px-4 py-2 text-white rounded-lg shadow-lg ${employee ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 cursor-not-allowed'}`}
                disabled={!employee}
              >
                <BsTrash className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No employee data available.</p>
        )}

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
              className="px-4 py-2 text-white bg-gray-500 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEmployee}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg"
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
