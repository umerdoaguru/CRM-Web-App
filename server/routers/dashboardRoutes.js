const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); 

// Import the controller functions
const {
    createContract, getAllContracts, getContractById, updateContract, deleteContract,
    createClient, getAllClients, getClientById, updateClient, deleteClient,
    createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice,
    createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment,
    createLead, getAllLeads, getLeadById, updateLead, deleteLead
} = require('../controllers/dashboard');

// Contract Routes
router.post('/contracts', createContract);
router.get('/contracts', getAllContracts);
router.get('/contracts/:id', getContractById);
router.put('/contracts/:id', updateContract);
router.delete('/contracts/:id', deleteContract);

// Client Routes
router.post('/clients', createClient);
router.get('/clients', getAllClients);
router.get('/clients/:id', getClientById);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

// Invoice Routes
router.post('/invoices', createInvoice);
router.get('/invoices', getAllInvoices);
router.get('/invoices/:id', getInvoiceById);
router.put('/invoices/:id', updateInvoice);
router.delete('/invoices/:id', deleteInvoice);

// Payment Routes
router.post('/payments', createPayment);
router.get('/payments', getAllPayments);
router.get('/payments/:id', getPaymentById);
router.put('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

// Lead Routes
router.post('/leads', createLead);
router.get('/leads', getAllLeads);
router.get('/leads/:id', getLeadById);
router.put('/leads/:id', updateLead);
router.delete('/leads/:id', deleteLead);

module.exports = router;
