const express = require("express");
const multer = require('multer');
const router = express.Router();

const { getEmployeeInvoice, getEmployeeInvoiceData, getEmployeeLeads, updateLeadStatus, getEmployeeQuotation } = require('../controllers/employeController');

router.get('/get-employee-invoice/:id', getEmployeeInvoice);
router.get('/get-employee-invoiceData/:id', getEmployeeInvoiceData);
router.get('/employe-leads/:id', getEmployeeLeads);
router.put('/updateLeadStatus/:id', updateLeadStatus);
router.get('/get-quotation-byEmploye/:id', getEmployeeQuotation);


module.exports = router;