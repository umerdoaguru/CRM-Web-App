const express = require("express");
const { db } = require("../db");
const path = require('path');

const getAllOrganizations = async (req, res) => {
  try {
    // Query to select all organizations
    const getAllOrgsQuery = "SELECT * FROM organization";

    db.query(getAllOrgsQuery, (err, result) => {
      if (err) {
        console.error("Error fetching organizations from MySQL:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ success: false, message: "No organizations found" });
      }

      // Construct the base URL for accessing assets
      const baseUrl = `${req.protocol}://${req.get('host')}/Assets/`;

      // Transform the results to include the full URL for images
      const organizationsWithUrls = result.map(org => ({
        ...org,
        signature: org.signature ? baseUrl + org.signature.split('/').pop() : null,
        logo: org.logo ? baseUrl + org.logo.split('/').pop() : null,
      }));

      // Return the list of organizations with URLs
      return res.status(200).json({
        success: true,
        organizations: organizationsWithUrls,
      });
    });
  } catch (error) {
    console.error("Error in fetching organizations:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching organizations",
      error: error.message,
    });
  }
};



const addOrganization = async (req, res) => {
  try {
    // Destructure organization fields from request body
    const { name, contact, bankDetails } = req.body;

    // Retrieve file paths for signature and logo, if available
    const signaturePath = req.files.signature ? `/Assets/${req.files.signature[0].filename}` : null;
    const logoPath = req.files.logo ? `/Assets/${req.files.logo[0].filename}` : null;

    // Insert data into the database
    const query = 'INSERT INTO organization (name, contact, bankDetails, signature, logo) VALUES (?, ?, ?, ?, ?)';
    const values = [name, contact, bankDetails, signaturePath, logoPath];

    // Execute the database query
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Organization added successfully' });
    });

  } catch (error) {
    // Handle any unexpected errors
    console.error('Error adding organization:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const addEmployee = async (req, res) => {
  try {
    const { name, email, position, phone, salary } = req.body;

    // Validations
    const requiredFields = [name, email];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Insert employee into the database
    const insertEmployeeQuery = `
      INSERT INTO employee (name, email, position, phone, salary)
      VALUES (?, ?, ?, ?, ?)
    `;

    const insertEmployeeParams = [
      name,
      email,
      position || null,
      phone || null,
      salary || null,
    ];

    db.query(insertEmployeeQuery, insertEmployeeParams, (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error inserting employee:', insertErr);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Employee added successfully');
        return res.status(201).json({
          success: true,
          message: 'Employee added successfully',
          employeeId: insertResult.insertId, // Returning the auto-generated ID
        });
      }
    });
  } catch (error) {
    console.error('Error in adding employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error in adding employee',
      error: error.message,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    // Query to get all employees
    const getAllEmployeesQuery = "SELECT * FROM employee";

    db.query(getAllEmployeesQuery, (err, results) => {
      if (err) {
        console.error("Error fetching employees from MySQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Return the results
      return res.status(200).json({
        success: true,
        employees: results,
      });
    });
  } catch (error) {
    console.error("Error in getting employees:", error);
    res.status(500).json({
      success: false,
      message: "Error in getting employees",
      error: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;  
    const { name, email, position, phone, salary } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    const query = `
      UPDATE employee
      SET name = ?, email = ?, position = ?, phone = ?, salary = ?
      WHERE employeeId = ?
    `;

    const params = [name, email, position || null, phone || null, salary || null, id];

    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Error updating employee:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      res.status(200).json({ success: true, message: 'Employee updated successfully' });
    });
  } catch (error) {
    console.error('Error in updateEmployee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;  // This is the auto-generated employeeId

    if (!id) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    const query = 'DELETE FROM employee WHERE employeeId = ?';

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error deleting employee:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    });
  } catch (error) {
    console.error('Error in deleteEmployee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const deleteOrganization = async (req, res) => {
    try {
      // Extract companyId from URL parameters
      const { id } = req.params;
  
      // Validate companyId
      if (!id) {
        return res.status(400).json({ error: "Company ID is required" });
      }
  
      // Check if the organization exists
      const checkOrgQuery = "SELECT * FROM organization WHERE companyId = ?";
  
      db.query(checkOrgQuery, [id], (err, result) => {
        if (err) {
          console.error("Error checking if organization exists in MySQL:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
  
        if (result.length === 0) {
          return res.status(404).json({ error: "Organization not found" });
        } else {
          // Organization found, proceed with deletion
          const deleteOrgQuery = "DELETE FROM organization WHERE companyId = ?";
  
          db.query(deleteOrgQuery, [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
              console.error("Error deleting organization:", deleteErr);
              return res.status(500).json({ error: "Internal server error" });
            } else {
              console.log("Organization deleted successfully");
              return res.status(200).json({
                success: true,
                message: "Organization deleted successfully",
              });
            }
          });
        }
      });
    } catch (error) {
      console.error("Error in deleting organization:", error);
      res.status(500).json({
        success: false,
        message: "Error in deleting organization",
        error: error.message,
      });
    }
  };
  

  const updateOrganization = async (req, res) => {
    try {
      const { companyId } = req.params; // Changed to companyId
      const { name, contact, bankDetails } = req.body;
  
      // Retrieve file paths for signature and logo, if available
      const signaturePath = req.files.signature ? `/Assets/${req.files.signature[0].filename}` : null;
      const logoPath = req.files.logo ? `/Assets/${req.files.logo[0].filename}` : null;
  
      // Construct the SQL query
      const query = `
        UPDATE organization 
        SET name = ?, contact = ?, bankDetails = ?, signature = COALESCE(?, signature), logo = COALESCE(?, logo) 
        WHERE companyId = ?
      `;
  
      // Values for the query
      const values = [name, contact, bankDetails, signaturePath, logoPath, companyId];
  
      // Execute the database query
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Organization not found' });
        }
  
        // Return success message
        res.status(200).json({ message: 'Organization updated successfully' });
      });
  
    } catch (error) {
      console.error('Error updating organization:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  

module.exports = {getAllOrganizations, addOrganization,deleteOrganization,updateOrganization ,addEmployee,getAllEmployees,updateEmployee,deleteEmployee};
