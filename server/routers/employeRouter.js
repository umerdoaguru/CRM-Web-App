const express = require("express");
const multer = require('multer');
const router = express.Router();

const { getEmployeeInvoice, getEmployeeLeads, updateLeadStatus, getEmployeeQuotation, employeeProfile } = require('../controllers/employeController');

router.get('/get-employee-invoice/:id', getEmployeeInvoice);
router.get('/employeeProfile/:id', employeeProfile);
router.get('/employe-leads/:id', getEmployeeLeads);
router.put('/updateLeadStatus/:id', updateLeadStatus);
router.get('/get-quotation-byEmploye/:id', getEmployeeQuotation);


module.exports = router;