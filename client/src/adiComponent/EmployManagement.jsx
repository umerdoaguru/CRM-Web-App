import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencilSquare, BsTrash, BsPlusCircle } from 'react-icons/bs';
import Modal from '../adiComponent/Modal'; // assuming you have a modal component
import Sider from '../components/Sider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
    phone: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/getAllEmployees');
      const { employees } = response.data;
      setEmployees(employees || []); // Ensure employees is always an array
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = async () => {
    const errors = {};

    // Validate Name
    if (!newEmployee.name) errors.name = 'Name is required';

    // Validate Email
    if (!newEmployee.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newEmployee.email)) errors.email = 'Email is invalid';
    else if (await isEmailTaken(newEmployee.email)) errors.email = 'Email is already taken';

    // Validate Position
    if (!newEmployee.position) errors.position = 'Position is required';

    // Validate Phone
    if (!newEmployee.phone) errors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(newEmployee.phone)) errors.phone = 'Phone number must be 10 digits';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isEmailTaken = async (email) => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/checkEmail', {
        params: { email },
      });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false; // Assuming email check fails means it's not taken
    }
  };

  const handleSaveEmployee = async () => {
    if (!await validateForm()) return; // Stop saving if validation fails

    try {
      if (editingIndex !== null) {
        // Update existing employee
        const employeeToUpdate = employees[editingIndex];
        await axios.put(`http://localhost:9000/api/v1/updateEmployee/${employeeToUpdate.employeeId}`, newEmployee);
      } else {
        // Add new employee
        await axios.post('http://localhost:9000/api/v1/addEmployee', newEmployee);
      }
      setNewEmployee({
        name: '',
        email: '',
        position: '',
        phone: '',
      });
      setShowForm(false);
      fetchEmployees(); // Fetch employees to update the list
    } catch (error) {
      console.error('Error saving employee:', error.response?.data || error.message);
    }
  };

  const handleEditEmployee = (index) => {
    const employeeToEdit = employees[index];
    setNewEmployee({
      name: employeeToEdit.name,
      email: employeeToEdit.email,
      position: employeeToEdit.position,
      phone: employeeToEdit.phone,
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/v1/deleteEmployee/${employeeId}`);
        fetchEmployees(); // Fetch employees to update the list
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleEmployeeClick = (employeeId) => {
    navigate(`/employee-single/${employeeId}`); 
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
            onClick={() => { setShowForm(true); setEditingIndex(null); }}
            className="flex items-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
          >
            <BsPlusCircle className="mr-2" /> Add Employee
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
                <th className="px-4 py-3 sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees
                  .filter((employee) => employee && employee.name) // Ensure employee and employee.name exist
                  .map((employee, index) => (
                    <tr
                      key={employee.employeeId}
                      className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleEmployeeClick(employee.employeeId)} // Navigate on row click
                    >
                      <td className="px-4 py-4 sm:px-6">{employee.name}</td>
                      <td className="px-4 py-4 sm:px-6">{employee.email}</td>
                      <td className="px-4 py-4 sm:px-6">{employee.position}</td>
                      <td className="px-4 py-4 sm:px-6">{employee.phone}</td>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex space-x-2 sm:space-x-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEditEmployee(index); }} // Now index is available
                            className="text-blue-500 transition duration-200 hover:text-blue-600"
                          >
                            <BsPencilSquare size={20} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteEmployee(employee.employeeId); }}
                            className="text-red-500 transition duration-200 hover:text-red-600"
                          >
                            <BsTrash size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center">No employees found</td>
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
              className={`p-2 border rounded-lg ${validationErrors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.name && <p className="text-sm text-red-500">{validationErrors.name}</p>}

            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={`p-2 border rounded-lg ${validationErrors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.email && <p className="text-sm text-red-500">{validationErrors.email}</p>}

            <input
              type="text"
              name="position"
              value={newEmployee.position}
              onChange={handleInputChange}
              placeholder="Position"
              className={`p-2 border rounded-lg ${validationErrors.position ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.position && <p className="text-sm text-red-500">{validationErrors.position}</p>}

            <input
              type="text"
              name="phone"
              value={newEmployee.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className={`p-2 border rounded-lg ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.phone && <p className="text-sm text-red-500">{validationErrors.phone}</p>}
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              onClick={() => setShowForm(false)} // Cancel button to close modal
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEmployee}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default EmployeeManagement;
