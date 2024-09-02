const express = require("express");
const { db } = require("../db");
const path = require('path');



const getOverviewMetrics = async (req, res) => {
    try {
        const query = `
            SELECT
                (SELECT COUNT(*) FROM clients) AS clientsAdded,
                (SELECT COUNT(*) FROM contracts WHERE status = 'signed') AS contractsSigned,
                (SELECT COUNT(*) FROM invoices) AS invoicesSent
        `;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching overview metrics:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(results[0]);
        });
    } catch (error) {
        console.error('Error in getOverviewMetrics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPaymentsData = async (req, res) => {
    try {
        const query = `
            SELECT
                month,
                SUM(received_amount) AS receivedAmount,
                SUM(due_amount) AS dueAmount
            FROM payments
            GROUP BY month
        `;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching payments data:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error in getPaymentsData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getDevicesData = async (req, res) => {
    try {
        const query = `
            SELECT
                device_type,
                COUNT(*) AS count
            FROM device_usage
            GROUP BY device_type
        `;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching devices data:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error in getDevicesData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getLeadsData = async (req, res) => {
    try {
        const query = `
            SELECT name, email, status, duration, date
            FROM leads
        `;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching leads data:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error in getLeadsData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getToDoList = async (req, res) => {
    try {
        const query = `
            SELECT title, time, date, status
            FROM todo_items
        `;
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching to-do list:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error in getToDoList:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new client
const createClient = async (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO clients (name, email) VALUES (?, ?)';
    try {
        await db.query(query, [name, email]);
        res.status(201).json({ success: true, message: 'Client added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all clients
const getAllClients = async (req, res) => {
    try {
      // Query to select all clients
      const getAllClientsQuery = "SELECT * FROM clients";
  
      db.query(getAllClientsQuery, (err, result) => {
        if (err) {
          console.error("Error fetching clients from MySQL:", err);
          return res.status(500).json({ success: false, message: "Internal server error" });
        }
  
        if (result.length === 0) {
          return res.status(404).json({ success: false, message: "No clients found" });
        }
  
        // If you need to process the results further, you can do it here
  
        // Return the list of clients
        return res.status(200).json({
          success: true,
          clients: result,
        });
      });
    } catch (error) {
      console.error("Error in fetching clients:", error);
      res.status(500).json({
        success: false,
        message: "Error in fetching clients",
        error: error.message,
      });
    }
  };
  
// Get a single client by ID
const getClientById = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM clients WHERE client_id = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateClient = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = 'UPDATE clients SET name = ?, email = ? WHERE client_id = ?';
  
    // Execute the query with the provided parameters
    db.query(query, [name, email, id], (err, result) => {
      if (err) {
        console.error("Error updating client in MySQL:", err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Client not found' });
      }
  
      // Client updated successfully
      res.status(200).json({ success: true, message: 'Client updated successfully' });
    });
  };
  

// Delete a client
const deleteClient = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM clients WHERE client_id = ?';
    try {
        const [result] = await db.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json({ success: true, message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createContract = (req, res) => {
    const { client_id, start_date, end_date, status } = req.body;  // Extracting all necessary fields
    const query = 'INSERT INTO contracts (client_id, start_date, end_date, status) VALUES (?, ?, ?, ?)';
  
    // Execute the query with the provided parameters
    db.query(query, [client_id, start_date, end_date, status], (err, result) => {
      if (err) {
        console.error("Error adding contract to MySQL:", err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      // Contract added successfully
      res.status(201).json({ success: true, message: 'Contract added successfully' });
    });
  };
  

// Get all contracts
const getAllContracts = (req, res) => {
    const query = 'SELECT * FROM contracts';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching contracts from MySQL:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No contracts found' });
        }

        // Return the list of contracts
        return res.status(200).json({
            success: true,
            contracts: results
        });
    });
};


// Get a single contract by ID
const getContractById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM contracts WHERE contract_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error fetching contract from MySQL:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        // Return the contract details
        return res.status(200).json(results[0]);
    });
};


// Update a contract
const updateContract = (req, res) => {
    const { id } = req.params;
    const { client_id, status } = req.body;
    const query = 'UPDATE contracts SET client_id = ?, status = ? WHERE contract_id = ?';

    db.query(query, [client_id, status, id], (err, result) => {
        if (err) {
            console.error("Error updating contract in MySQL:", err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        res.status(200).json({ success: true, message: 'Contract updated successfully' });
    });
};

// Delete a contract
const deleteContract = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM contracts WHERE contract_id = ?';
    try {
        const [result] = await db.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.status(200).json({ success: true, message: 'Contract deleted successfully' });
    } catch (error) {
        console.error("Error deleting contract:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createInvoice = async (req, res) => {
    const { client_id, amount, status } = req.body;
    const query = 'INSERT INTO invoices (client_id, amount, status) VALUES (?, ?, ?)';
    try {
        await db.query(query, [client_id, amount, status]);
        res.status(201).json({ success: true, message: 'Invoice added successfully' });
    } catch (error) {
        console.error("Error adding invoice:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Get all invoices
const getAllInvoices = (req, res) => {
    const query = 'SELECT * FROM invoices';
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching invoices:", err); // Log the error details
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No invoices found' });
        }

        res.status(200).json(results);
    });
};




// Get a single invoice by ID
const getInvoiceById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM invoices WHERE invoice_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error fetching invoice:", err); // Log the error details
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.status(200).json(results[0]);
    });
};


// Update an invoice
const updateInvoice = (req, res) => {
    const { id } = req.params;
    const { client_id, amount, status } = req.body;
    const query = 'UPDATE invoices SET client_id = ?, amount = ?, status = ? WHERE invoice_id = ?';

    db.query(query, [client_id, amount, status, id], (err, result) => {
        if (err) {
            console.error("Error updating invoice:", err); // Log the error details
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.status(200).json({ success: true, message: 'Invoice updated successfully' });
    });
};


// Delete an invoice
const deleteInvoice = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM invoices WHERE invoice_id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting invoice:", err); // Log the error details
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
    });
};


const createPayment = (req, res) => {
    const { client_id, received_amount, due_amount, created_at } = req.body;
    const query = 'INSERT INTO payments (client_id, received_amount, due_amount, created_at) VALUES (?, ?, ?, ?)';

    db.query(query, [client_id, received_amount, due_amount, created_at], (err, result) => {
        if (err) {
            console.error("Error creating payment:", err); // Log the error details
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ success: true, message: 'Payment added successfully' });
    });
};




// Get all payments
const getAllPayments = (req, res) => {
    const query = 'SELECT * FROM payments';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching payments:", err); // Log the error details
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(200).json(results);
    });
};


// Get a single payment by ID
const getPaymentById = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM payments WHERE payment_id = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a payment
const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { client_id, amount, date } = req.body;
    const query = 'UPDATE payments SET client_id = ?, amount = ?, date = ? WHERE payment_id = ?';
    try {
        const [result] = await db.query(query, [client_id, amount, date, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json({ success: true, message: 'Payment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a payment
const deletePayment = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM payments WHERE payment_id = ?';
    try {
        const [result] = await db.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json({ success: true, message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createLead = async (req, res) => {
    const { name, email, status, duration, date } = req.body;
    const query = 'INSERT INTO leads (name, email, status, duration, date) VALUES (?, ?, ?, ?, ?)';
    try {
        await db.query(query, [name, email, status, duration, date]);
        res.status(201).json({ success: true, message: 'Lead added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all leads
const getAllLeads = async (req, res) => {
    const query = 'SELECT * FROM leads';
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single lead by ID
const getLeadById = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM leads WHERE lead_id = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a lead
const updateLead = async (req, res) => {
    const { id } = req.params;
    const { name, email, status, duration, date } = req.body;
    const query = 'UPDATE leads SET name = ?, email = ?, status = ?, duration = ?, date = ? WHERE lead_id = ?';
    try {
        const [result] = await db.query(query, [name, email, status, duration, date, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        res.status(200).json({ success: true, message: 'Lead updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a lead
const deleteLead = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM leads WHERE lead_id = ?';
    try {
        const [result] = await db.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        res.status(200).json({ success: true, message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


    module.exports = { createContract, getAllContracts, getContractById, updateContract, deleteContract,createClient, getAllClients, getClientById, updateClient, deleteClient,createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice,createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment, createLead, getAllLeads, getLeadById, updateLead, deleteLead,getOverviewMetrics,getPaymentsData, getLeadsData,getToDoList,getDevicesData };
