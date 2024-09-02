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
    const query = 'SELECT * FROM clients';
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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

// Update a client
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = 'UPDATE clients SET name = ?, email = ? WHERE client_id = ?';
    try {
        const [result] = await db.query(query, [name, email, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.status(200).json({ success: true, message: 'Client updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
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




const createContract = async (req, res) => {
    const { client_id, status } = req.body;
    const query = 'INSERT INTO contracts (client_id, status) VALUES (?, ?)';
    try {
        await db.query(query, [client_id, status]);
        res.status(201).json({ success: true, message: 'Contract added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all contracts
const getAllContracts = async (req, res) => {
    const query = 'SELECT * FROM contracts';
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single contract by ID
const getContractById = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM contracts WHERE contract_id = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a contract
const updateContract = async (req, res) => {
    const { id } = req.params;
    const { client_id, status } = req.body;
    const query = 'UPDATE contracts SET client_id = ?, status = ? WHERE contract_id = ?';
    try {
        const [result] = await db.query(query, [client_id, status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.status(200).json({ success: true, message: 'Contract updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
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
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all invoices
const getAllInvoices = async (req, res) => {
    const query = 'SELECT * FROM invoices';
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single invoice by ID
const getInvoiceById = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM invoices WHERE invoice_id = ?';
    try {
        const [results] = await db.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an invoice
const updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { client_id, amount, status } = req.body;
    const query = 'UPDATE invoices SET client_id = ?, amount = ?, status = ? WHERE invoice_id = ?';
    try {
        const [result] = await db.query(query, [client_id, amount, status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(200).json({ success: true, message: 'Invoice updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an invoice
const deleteInvoice = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM invoices WHERE invoice_id = ?';
    try {
        const [result] = await db.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createPayment = async (req, res) => {
    const { client_id, amount, date } = req.body;
    const query = 'INSERT INTO payments (client_id, amount, date) VALUES (?, ?, ?)';
    try {
        await db.query(query, [client_id, amount, date]);
        res.status(201).json({ success: true, message: 'Payment added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all payments
const getAllPayments = async (req, res) => {
    const query = 'SELECT * FROM payments';
    try {
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
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



module.exports = { createContract, getAllContracts, getContractById, updateContract, deleteContract,createClient, getAllClients, getClientById, updateClient, deleteClient,createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice,createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment, createLead, getAllLeads, getLeadById, updateLead, deleteLead   };
