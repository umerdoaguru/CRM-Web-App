const express = require("express");
const { db } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');






 

  const Quotation = async (req, res) => {
    try {
      const { quotation_name, services } = req.body;
      const { employeeId } = req.body; // Assuming employeeId is retrieved from the authenticated user
  
      if (!quotation_name || !services || services.length === 0) {
        return res.status(400).json({ error: "Quotation name and services are required" });
      }
  
      // Insert quotation with employeeId
      const sqlQuotation = "INSERT INTO quotations_data (quotation_name, employeeId) VALUES (?, ?)";
      const resultQuotation = await new Promise((resolve, reject) => {
        db.query(sqlQuotation, [quotation_name, employeeId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      // Get quotation ID and name
      const quotationId = resultQuotation.insertId;
      const quotationName = quotation_name;
  
      // Insert services with the associated quotation_id and quotation_name
      const sqlServices = "INSERT INTO services_data (quotation_id, quotation_name, service_type, service_name, service_description, actual_price, offer_price, subscription_frequency) VALUES ?";
      const servicesValues = services.map((service) => [
        quotationId,
        quotationName,
        service.service_type,
        service.service_name,
        service.service_description,
        service.actual_price,
        service.offer_price,
        service.subscription_frequency,
      ]);
  
      await new Promise((resolve, reject) => {
        db.query(sqlServices, [servicesValues], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      res.status(200).json({
        success: true,
        message: "Quotation and services added successfully",
        quotation: {
          id: quotationId,
          quotation_name: quotationName,
        },
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  
  
  
  
  
  const deleteQuotation = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Begin a transaction
      await new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      // Delete notes associated with the quotation
      const sqlDeleteNotes = "DELETE FROM notes WHERE quotation_id = ?";
      await new Promise((resolve, reject) => {
        db.query(sqlDeleteNotes, [id], (err, result) => {
          if (err) {
            // Rollback the transaction if an error occurs
            db.rollback(() => reject(err));
          } else {
            resolve(result);
          }
        });
      });
  
      // Delete services associated with the quotation
      const sqlDeleteServices = "DELETE FROM services_data WHERE quotation_id = ?";
      await new Promise((resolve, reject) => {
        db.query(sqlDeleteServices, [id], (err, result) => {
          if (err) {
            // Rollback the transaction if an error occurs
            db.rollback(() => reject(err));
          } else {
            resolve(result);
          }
        });
      });
  
      // Delete the quotation itself
      const sqlDeleteQuotation = "DELETE FROM quotations_data WHERE quotation_id = ?";
      await new Promise((resolve, reject) => {
        db.query(sqlDeleteQuotation, [id], (err, result) => {
          if (err) {
            // Rollback the transaction if an error occurs
            db.rollback(() => reject(err));
          } else {
            resolve(result);
          }
        });
      });
  
      // Commit the transaction
      await new Promise((resolve, reject) => {
        db.commit((err) => {
          if (err) {
            // Rollback the transaction if an error occurs during commit
            db.rollback(() => reject(err));
          } else {
            resolve();
          }
        });
      });
  
      res.status(200).json({
        success: true,
        message: "Quotation, associated notes, and services deleted successfully",
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  
  
  
  // const GetQuotation = async (req, res) => {
  //   try {
  //     const sql = "SELECT * FROM quotations_data ORDER BY quotation_id DESC";
  
  //     const quotations = await new Promise((resolve, reject) => {
  //       db.query(sql, (err, results) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(results);
  //         }
  //       });
  //     });
  
  //     res.status(200).json(quotations);
  //   } catch (error) {
  //     console.error("Error processing request:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // };
  
    const GetQuotation = async (req, res) => {
      try {
        const { UserId } = req.params; // Extracting UserId from req.params
        const sql = "SELECT * FROM quotations_data WHERE employeeId = ? ORDER BY quotation_id DESC";
  
        const quotations = await new Promise((resolve, reject) => {
          db.query(sql, [UserId], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
  
        res.status(200).json(quotations);
      } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };

    const getAllQuotation = async (req, res) => {
      try {
        const sql = "SELECT * FROM quotations_data";
  
        const allQuotations = await new Promise((resolve, reject) => {
          db.query(sql,(err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
  
        res.status(200).json({message: "Successfull", data: allQuotations});
      } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Internal Server Error", success: false, error });
      }
    }
  
  
   const  GetQuotationName = async (req, res) => {
    try {
      const { quotationId } = req.params; // Extracting UserId from req.params
      const sql = "SELECT * FROM quotations_data WHERE quotation_id = ? ";
  
      const quotations = await new Promise((resolve, reject) => {
        db.query(sql, [quotationId], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      res.status(200).json(quotations);
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
    const UpdateQuotationName = async (req, res) => {
      try {
          const { quotationId } = req.params; // Extracting quotationId from req.params
          const { newName } = req.body; // Extracting new quotation name from req.body
  
          // Construct SQL query to update the quotation name
          const sql = "UPDATE quotations_data SET quotation_name = ? WHERE quotation_id = ?";
  
          // Execute the update query asynchronously
          await new Promise((resolve, reject) => {
              db.query(sql, [newName, quotationId], (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              });
          });
          const sql2 = "UPDATE services_data SET quotation_name = ? WHERE quotation_id = ?";
  
          // Execute the update query asynchronously
          await new Promise((resolve, reject) => {
              db.query(sql2, [newName, quotationId], (err, results) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(results);
                  }
              });
          });
  
          res.status(200).json({ message: "Quotation name updated successfully" });
      } catch (error) {
          console.error("Error updating quotation name:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
  };
  
  
  
  
  
  
  
  
  const CopyQuotationData = async (req, res) => {
    try {
      const { quotationId } = req.params;
  
      const queryAsync = (sql, params) =>
        new Promise((resolve, reject) => {
          db.query(sql, params, (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
  
      // Retrieve the quotation data
      const quotation = await queryAsync("SELECT * FROM quotations_data WHERE quotation_id = ?", [quotationId]);
      const quotationData = quotation[0];
      if (!quotationData) {
        return res.status(404).json({ error: "Quotation not found" });
      }
  
      // Create a new quotation name
      const newQuotationName = `Copy of ${quotationData.quotation_name}`;
  
      // Insert the copied quotation
      const result = await queryAsync("INSERT INTO quotations_data (quotation_name, employeeId) VALUES (?, ?)", [newQuotationName, quotationData.employeeId]);
      const newQuotationId = result.insertId;
  
      // Retrieve and copy services
      const services = await queryAsync("SELECT * FROM services_data WHERE quotation_id = ?", [quotationId]);
      const servicesValues = services.map((service) => [
        newQuotationId,
        newQuotationName,
        service.service_type,
        service.service_name,
        service.service_description,
        service.actual_price,
        service.offer_price,
        service.subscription_frequency,
      ]);
      await queryAsync("INSERT INTO services_data (quotation_id, quotation_name, service_type, service_name, service_description, actual_price, offer_price, subscription_frequency) VALUES ?", [servicesValues]);
  
      // Retrieve and copy notes
      const getNotes = await queryAsync("SELECT * FROM notes WHERE quotation_id = ?", [quotationId]);
      if (Array.isArray(getNotes) && getNotes.length > 0) {
        const notesValues = getNotes.map((note) => [note.note_text, newQuotationId]);
        await queryAsync("INSERT INTO notes (note_text, quotation_id) VALUES ?", [notesValues]);
      }
  
      res.status(200).json({ message: "Quotation, services, and notes copied successfully" });
    } catch (error) {
      console.error("Error copying quotation, services, or notes data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  const Quotationviaid = (req, res) => {
    try {
      const quotation_id = req.params.id;
  
      const getQuery = `SELECT * FROM services_data WHERE quotation_id = ?`;
  
      db.query(getQuery, quotation_id, (error, result) => {
        if (error) {
          console.log("Quotation not found", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  
  // const addServices = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { quotation_name, services } = req.body;
  
  //     if (!id || !quotation_name || !services || services.length === 0) {
  //       return res.status(400).json({ error: 'Quotation ID, name, and services are required' });
  //     }
  
  //     const servicesValues = services.map((service) => [
  //       id,
  //       quotation_name,
  //       service.service_type,
  //       service.service_name,
  //       service.service_description,
  //       service.actual_price,
  //       service.offer_price, 
  //      service.subscription_frequency, 
  //     ]);
  
  //     const sql = "INSERT INTO services_data (quotation_id, quotation_name, service_type, service_name, service_description, actual_price, offer_price, subscription_frequency) VALUES ?";
  
  //     await new Promise((resolve, reject) => {
  //       db.query(sql, [servicesValues], (err, result) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(result);
  //         }
  //       });
  //     });
  
  //     res.status(201).json({ success: true, message: 'Services added successfully' });
  //   } catch (error) {
  //     console.error('Error adding services:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  
  const addServices = async (req, res) => {
    try {
      const { id } = req.params;
      const { quotation_name, services } = req.body;
  
      if (!id || !quotation_name || !services || services.length === 0) {
        return res.status(400).json({ error: 'Quotation ID, name, and services are required' });
      }
  
      const servicesValues = services.map((service) => [
        id,
        quotation_name,
        service.service_type,
        service.service_name,
        service.service_description,
        service.actual_price,
        service.offer_price, 
       service.subscription_frequency, 
      ]);
  
      const sql = "INSERT INTO services_data (quotation_id, quotation_name, service_type, service_name, service_description, actual_price, offer_price, subscription_frequency) VALUES ?";
  
      await new Promise((resolve, reject) => {
        db.query(sql, [servicesValues], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      res.status(201).json({ success: true, message: 'Services added successfully' });
    } catch (error) {
      console.error('Error adding services:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  
  const deleteService = async (req, res) => {
    try {
      const { serviceId } = req.params;
  
      // Implement logic to delete the service with the specified ID from your database
      const result = await new Promise((resolve, reject) => {
        db.query('DELETE FROM services_data WHERE service_id = ?', [serviceId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  
      // Check if a row was affected to determine if the service was found and deleted
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: 'Service deleted successfully' });
      } else {
        res.status(404).json({ error: 'Service not found' });
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  
  
  const GetServices = (req, res) => {
    try {
      const getquery = "SELECT * FROM services";
  
      db.query(getquery, (error, result) => {
        if (error) {
          console.log("services not found", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          const user = result;
          res.status(200).json({
            success: true,
            message: "services added successfully",
            services: user,
          });
        }
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // const updateServices = async (req, res) => {
  //   try {
  //     const { quotationId } = req.params;
  //     const { services } = req.body;
  
   
  //     for (const service of services) {
  //       const sqlUpdateService = `
  //         UPDATE services_data
  //         SET
  //           service_type = ?,
  //           service_description = ?,
  //           actual_price = ?,
  //           offer_price = ?
  //         WHERE
  //           quotation_id = ? AND service_id = ?`;
  
  //       const values = [
  //         service.service_type,
  //         service.service_description,
  //         service.actual_price,
  //         service.offer_price,
  //         quotationId,
  //         service.service_id,
  //       ];
  
  //       await db.query(sqlUpdateService, values);
  //     }
  
  //     res.status(200).json({ success: true, message: 'Services updated successfully' });
  //   } catch (error) {
  //     console.error('Error updating services:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  
  const updateServices = async (req, res) => {
    try {
      const { quotationId } = req.params;
      const { services } = req.body;
  
      const updateServicePromises = services.map(async (service) => {
        const sqlUpdateService = `
          UPDATE services_data
          SET
            service_type = ?,
            service_name = ?,
            service_description = ?,
            actual_price = ?,
            offer_price = ?,
            subscription_frequency = ?
          WHERE
            quotation_id = ? AND service_id = ?`;
  
        const values = [
          service.service_type,
          service.service_name,
          service.service_description,
          service.actual_price,
          service.offer_price,
          service.subscription_frequency, 
          quotationId,
          service.service_id,
        ];
  
        await db.query(sqlUpdateService, values);
      });
  
      await Promise.all(updateServicePromises);
  
      res.status(200).json({ success: true, message: 'Services updated successfully' });
    } catch (error) {
      console.error('Error updating services:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const Notes = (req, res) => {
    const { noteTexts, quotationId } = req.body;
  
    // Assuming noteTexts is an array of strings
    const values = noteTexts.map((text) => [text, quotationId]);
  
    const sql = 'INSERT INTO notes (note_text, quotation_id) VALUES ?';
  
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Error inserting notes:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ ids: result.insertId });
      }
    });
  };
  
  
  const getNotes = (req, res) => {
    const { quotationId } = req.params;
  
    // Assuming you have a 'notes' table in your database
    const sql = 'SELECT * FROM notes WHERE quotation_id = ?';
  
    db.query(sql, [quotationId], (err, result) => {
      if (err) {
        console.error('Error fetching notes:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(result);
      }
    });
  };
  
  const deleteNote = (req, res) => {
    const noteId = req.params.noteId;
  
    const sql = 'DELETE FROM notes WHERE id = ?';
  
    db.query(sql, [noteId], (err, result) => {
      if (err) {
        console.error('Error deleting note:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Note deleted successfully' });
      }
    });
  };
  const updateNote = async (req, res) => {
    const { notes } = req.body;
  
    try {
      // Use map to update each note in the database
      await Promise.all(notes.map(async (note) => {
        const { id, quotation_id, note_text } = note;
        // Execute the update query for each note
        await db.query('UPDATE notes SET note_text = ? WHERE id = ? AND quotation_id = ?', [note_text, id, quotation_id]);
      }));
      // Send a success response
      res.status(200).json({ success: true, message: 'Notes updated successfully' });
    } catch (error) {
      console.error('Error updating notes:', error);
      // Send an error response
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  
  
  const getnotes_text = (req, res) => {
    const sql = 'SELECT notes_text FROM notes_data';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching notes:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const notes = result.map((row) => row.notes_text);
        res.json(notes);
      }
    });
  };

  const createLead = (req, res) => {
    const { lead_no, name, phone, assignedTo, leadSource } = req.body;
    const sql = `INSERT INTO leads (lead_no, name, phone, assignedTo, leadSource) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [lead_no, name, phone, assignedTo, leadSource], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error inserting data" });
        } else {
            res.status(201).json({ success: true, message: "Lead data successfully submitted" });
        }
    });
};


const getLeads = (req, res) => {
    const sql = 'SELECT * FROM leads';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error fetching data" });
        } else {
            res.status(200).json(results);
        }
    });
};


const updateLead = (req, res) => {
    const { id } = req.params;
    const { lead_no ,name, phone, assignedTo, leadSource } = req.body;
    const sql = `UPDATE leads SET lead_no=? ,name=?, phone=?, assignedTo=?, leadSource=? WHERE id=?`;
    db.query(sql, [lead_no,name, phone, assignedTo, leadSource, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error updating data" });
        } else {
            res.status(200).json({ success: true, message: "Lead data successfully updated" });
        }
    });
};


const deleteLead = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM leads WHERE id=?`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error deleting data" });
        } else {
            res.status(200).json({ success: true, message: "Lead data successfully deleted" });
        }
    });
};


const employeeData = (req,res)=>{

const sql = `SELECT * FROM employee`;

db.query(sql, (err,results)=>{
  if (err) {
res.status(500).json({error: "Error fetchinf data "})
    
  } else {
    res.status(201).json(results);
  }
});



}

   
const editProfile = async (req, res) => {
  try {
    // Extract data from request body and file
    const { user_name, email, phone, mobile, address, interested_in, bio } = req.body;
    const profile_picture = req.file ? req.file.buffer : null;

    console.log('Request Body:', req.body);
    console.log('File:', req.file);

    // Validate required fields
    if (!user_name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM user_data WHERE email = ?";
    db.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking if user exists in MySQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length === 0) {
        // User not found, insert a new user
        const insertUserQuery = `
          INSERT INTO user_data (user_name, email, profile_picture, phone, mobile, address, interested_in, bio)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const insertParams = [
          user_name,
          email,
          profile_picture,
          phone,
          mobile,
          address,
          interested_in,
          bio
        ];

        db.query(insertUserQuery, insertParams, (insertErr) => {
          if (insertErr) {
            console.error("Error inserting new user profile:", insertErr);
            return res.status(500).json({ error: "Internal server error" });
          } else {
            console.log("New user profile created successfully");
            return res.status(201).json({
              success: true,
              message: "New user profile created successfully"
            });
          }
        });
      } else {
        // User found, update the existing user's profile
        const updateUserQuery = `
          UPDATE user_data
          SET user_name = ?, profile_picture = ?, phone = ?, mobile = ?, address = ?, interested_in = ?, bio = ?
          WHERE email = ?
        `;

        const updateParams = [
          user_name,
          profile_picture,
          phone,
          mobile,
          address,
          interested_in,
          bio,
          email
        ];

        db.query(updateUserQuery, updateParams, (updateErr) => {
          if (updateErr) {
            console.error("Error updating user profile:", updateErr);
            return res.status(500).json({ error: "Internal server error" });
          } else {
            console.log("User profile updated successfully");
            return res.status(200).json({
              success: true,
              message: "User profile updated successfully"
            });
          }
        });
      }
    });
  } catch (error) {
    console.error("Error in editing profile:", error);
    res.status(500).json({
      success: false,
      message: "Error in editing profile",
      error: error.message,
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Delete user profile from the database
    const deleteUserQuery = "DELETE FROM user_data WHERE email = ?";
    db.query(deleteUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error deleting user profile from MySQL:", err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        // No user found with the provided email
        return res.status(404).json({ error: 'User not found' });
      }

      // Profile successfully deleted
      return res.status(200).json({ success: true, message: 'Profile deleted successfully' });
    });
  } catch (error) {
    console.error("Error in deleting profile:", error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
 
const getAllUsers = async (req, res) => {
  try {
    // Query to get all users from the user_data table
    const getAllUsersQuery = "SELECT * FROM user_data";

    // Execute the query
    db.query(getAllUsersQuery, (err, result) => {
      if (err) {
        console.error("Error fetching users from MySQL:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Return the result as a JSON response
      return res.status(200).json({
        success: true,
        data: result,
        message: "Users retrieved successfully",
      });
    });
  } catch (error) {
    console.error("Error in retrieving users:", error);
    res.status(500).json({
      success: false,
      message: "Error in retrieving users",
      error: error.message,
    });
  }
};

  
  
  
  
  
  
  module.exports = { Quotation, GetQuotation, getAllQuotation, Quotationviaid,addServices,deleteService, GetServices,deleteQuotation,updateServices,Notes,getNotes,
    getnotes_text,
    deleteNote , UpdateQuotationName,CopyQuotationData ,GetQuotationName,updateNote,createLead,
    getLeads,
    updateLead,
    deleteLead,employeeData,editProfile,getAllUsers,deleteProfile};
  
  

  