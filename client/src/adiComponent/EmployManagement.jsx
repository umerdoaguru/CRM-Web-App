import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencilSquare, BsTrash, BsPlusCircle } from 'react-icons/bs';
import Modal from '../adiComponent/Modal'; // assuming you have a modal component
import Sider from '../components/Sider';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    salary: '', // Added salary field
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleSaveEmployee = async () => {
    try {
      if (!newEmployee.name || !newEmployee.email) {
        console.error('Name and Email are required');
        return;
      }

      if (editingIndex !== null) {
        // Update existing employee
        const employeeToUpdate = employees[editingIndex];
        await axios.put(`http://localhost:9000/api/v1/updateEmployee/${employeeToUpdate.employeeId}`, newEmployee);
        const updatedEmployees = [...employees];
        updatedEmployees[editingIndex] = { ...employeeToUpdate, ...newEmployee };
        setEmployees(updatedEmployees);
        setEditingIndex(null);
      } else {
        // Add new employee
        const response = await axios.post('http://localhost:9000/api/v1/addEmployee', newEmployee);
        setEmployees((prev) => [...prev, response.data.employee]);
      }
      setNewEmployee({
        name: '',
        email: '',
        position: '',
        phone: '',
        salary: '', // Reset salary
      });
      setShowForm(false);
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
      salary: employeeToEdit.salary, // Set salary
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:9000/api/v1/deleteEmployee/${employeeId}`);
        setEmployees(employees.filter((employee) => employee.employeeId !== employeeId));
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
                <th className="px-4 py-3 sm:px-6">Salary</th>
                <th className="px-4 py-3 sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees
                  .filter((employee) => employee && employee.name) // Ensure employee and employee.name exist
                  .map((employee, index) => (
                    <tr key={employee.employeeId} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-4 py-4 sm:px-6">{employee.name}</td>
                      <td className="px-4 py-4 sm:px-6">{employee.email}</td>
                      <td className="px-4 py-4 sm:px-6">{employee.position}</td>
                      <td className="px-4 py-4 sm:px-6">{employee.phone}</td>
                      <td className="px-4 py-4 sm:px-6">{employee.salary}</td>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex space-x-2 sm:space-x-4">
                          <button
                            onClick={() => handleEditEmployee(index)}
                            className="text-blue-500 transition duration-200 hover:text-blue-600"
                          >
                            <BsPencilSquare size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(employee.employeeId)}
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
                  <td colSpan="6" className="py-4 text-center">No employees found</td>
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
              type="number"
              name="salary"
              value={newEmployee.salary}
              onChange={handleInputChange}
              placeholder="Salary"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveEmployee}
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
        </Modal>
      </main>
    </div>
  );
};

export default EmployeeManagement;
