const express = require("express");
const { db } = require("../db");



const getAllOrganizations = async (req, res) => {
  try {
    // Query to select all organizations
    const getAllOrgsQuery = "SELECT * FROM organization";

    db.query(getAllOrgsQuery, (err, result) => {
      if (err) {
        console.error("Error fetching organizations from MySQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "No organizations found" });
      }

      // Return the list of organizations
      return res.status(200).json({
        success: true,
        organizations: result,
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
    const { name, bankDetails, signature, logo } = req.body;

    // Validations
    const requiredFields = [name, bankDetails];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "Name and bank details are required" });
    }

    // Check if the organization already exists
    const checkOrgQuery = "SELECT * FROM organization WHERE name = ?";

    db.query(checkOrgQuery, [name], (err, result) => {
      if (err) {
        console.error("Error checking if organization exists in MySQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length > 0) {
        return res.status(400).json({
          error: "Organization already exists.",
        });
      } else {
        // Organization not found, proceed with insertion
        const insertOrgQuery = `
          INSERT INTO organization (name, bankDetails, signature, logo)
          VALUES (?, ?, ?, ?)
        `;

        const insertOrgParams = [
          name,
          JSON.stringify(bankDetails),
          signature || null,
          logo || null,
        ];

        db.query(insertOrgQuery, insertOrgParams, (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting organization:", insertErr);
            return res.status(500).json({ error: "Internal server error" });
          } else {
            console.log("Organization added successfully");
            return res.status(200).json({
              success: true,
              message: "Organization added successfully",
              organizationId: insertResult.insertId,
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("Error in adding organization:", error);
    res.status(500).json({
      success: false,
      message: "Error in adding organization",
      error: error.message,
    });
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
      
      const { id } = req.params;
      // Extract other fields from request body
      const { name, bankDetails, signature, logo } = req.body;
  
      console.log(`Received ID: ${id}`);
      console.log(`Received Body: ${JSON.stringify(req.body)}`);
  
      // Validate id and required fields
      if (!id) {
        return res.status(400).json({ error: "Organization ID is required" });
      }
      const requiredFields = [name, bankDetails];
      if (requiredFields.some((field) => !field)) {
        return res.status(400).json({ error: "Name and bank details are required" });
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
          // Organization found, proceed with update
          const updateOrgQuery = `
            UPDATE organization
            SET name = ?, bankDetails = ?, signature = ?, logo = ?
            WHERE companyId = ?
          `;
  
          const updateOrgParams = [
            name,
            JSON.stringify(bankDetails),
            signature || null,
            logo || null,
            id
          ];
  
          db.query(updateOrgQuery, updateOrgParams, (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating organization:", updateErr);
              return res.status(500).json({ error: "Internal server error" });
            } else {
              console.log("Organization updated successfully");
              return res.status(200).json({
                success: true,
                message: "Organization updated successfully",
              });
            }
          });
        }
      });
    } catch (error) {
      console.error("Error in updating organization:", error);
      res.status(500).json({
        success: false,
        message: "Error in updating organization",
        error: error.message,
      });
    }
  };
  
  

module.exports = {getAllOrganizations, addOrganization,deleteOrganization,updateOrganization };
