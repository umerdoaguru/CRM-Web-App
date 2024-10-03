const express = require("express");
const multer = require('multer');
const { getEmployeeInvoice, employeeProfile, getEmployeeLeads, updateLeadStatus, getEmployeeQuotation, updateOnlyLeadStatus } = require("../controllers/employeController");
const router = express.Router();


router.get('/get-employee-invoice/:id', getEmployeeInvoice);
router.get('/employeeProfile/:id', employeeProfile);
router.get('/employe-leads/:id', getEmployeeLeads);
router.put('/updateLeadStatus/:id', updateLeadStatus);
router.put('/updateOnlyLeadStatus/:id', updateOnlyLeadStatus);
router.get('/get-quotation-byEmploye/:id', getEmployeeQuotation);


module.exports = router;