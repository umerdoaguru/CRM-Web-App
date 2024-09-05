import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
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
    signature: null,
    photo: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch employee data
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/v1/getEmployeeById/${employeeId}`);
      if (response.data.success) {
        setEmployee(response.data.employee);
        setNewEmployee({
          name: response.data.employee.name || '',
          email: response.data.employee.email || '',
          position: response.data.employee.position || '',
          phone: response.data.employee.phone || '',
          signature: null,
          photo: null,
        });
      } else {
        setError('Failed to fetch employee');
      }
    } catch (error) {
      setError('Error fetching employee');
      console.error('Error fetching employee:', error);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

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
    else if (await isPhoneNumberTaken(newEmployee.phone)) errors.phone = 'Phone number is already taken';
    
    // Validate Files
    if (newEmployee.photo && !['image/jpeg', 'image/png'].includes(newEmployee.photo.type)) errors.photo = 'Photo must be an image (jpeg/png)';
    if (newEmployee.signature && !['image/jpeg', 'image/png'].includes(newEmployee.signature.type)) errors.signature = 'Signature must be an image (jpeg/png)';

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

  const isPhoneNumberTaken = async (phone) => {
    try {
      const response = await axios.get('http://localhost:9000/api/v1/checkPhoneNumber', {
        params: { phone },
      });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking phone number:', error);
      return false; // Assuming phone number check fails means it's not taken
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For phone number, allow only numeric values
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10); // Allow only digits and limit to 10 characters
      setNewEmployee((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setNewEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleKeyPress = (e) => {
    // Allow only numeric keys and control keys (e.g., backspace, arrow keys)
    if (e.target.name === 'phone') {
      if (!/[0-9]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleFileInput = (e, field) => {
    setNewEmployee((prev) => ({ ...prev, [field]: e.target.files[0] }));
  };

  const handleSaveEmployee = async () => {
    if (!await validateForm()) return; // Stop saving if validation fails

    try {
      const formData = new FormData();
      formData.append('name', newEmployee.name);
      formData.append('email', newEmployee.email);
      formData.append('position', newEmployee.position);
      formData.append('phone', newEmployee.phone);

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
        // Refresh the employee data after saving
        await fetchEmployee(); // Fetch new data
        setNewEmployee({
          name: '',
          email: '',
          position: '',
          phone: '',
          signature: null,
          photo: null,
        });
        setShowForm(false);
        setEditingIndex(null);
      } else {
        setError('Failed to save employee');
      }
    } catch (error) {
      setError('Error saving employee');
      console.error('Error saving employee:', error);
    }
  };

  const handleEditEmployee = () => {
    if (employee) {
      setNewEmployee({
        name: employee.name || '',
        email: employee.email || '',
        position: employee.position || '',
        phone: employee.phone || '',
        signature: null,
        photo: null,
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
          setError('Error deleting employee');
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

        {error && <p className="text-red-600">{error}</p>}

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
                <h3 className="text-xl font-semibold text-gray-800">{employee.name || 'No Name Available'}</h3>
                <p className="text-gray-600">{employee.position || 'No Position Available'}</p>
                <p className="text-gray-600">{employee.email || 'No Email Available'}</p>
                <p className="text-gray-600">{employee.phone || 'No Phone Available'}</p>
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
              onKeyPress={handleKeyPress}
              placeholder="Phone"
              className={`p-2 border rounded-lg ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {validationErrors.phone && <p className="text-sm text-red-500">{validationErrors.phone}</p>}

            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileInput(e, 'photo')}
              className="p-2 border rounded-lg"
            />
            {validationErrors.photo && <p className="text-sm text-red-500">{validationErrors.photo}</p>}
            
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => handleFileInput(e, 'signature')}
              className="p-2 border rounded-lg"
            />
            {validationErrors.signature && <p className="text-sm text-red-500">{validationErrors.signature}</p>}
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleSaveEmployee}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg shadow-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default EmployeeSingle;
