const express = require("express");
const multer = require('multer');
const router = express.Router();

const { getEmployeeInvoice, getEmployeeLeads, updateLeadStatus } = require('../controllers/employeController');

router.get('/get-employee-invoice/:id', getEmployeeInvoice);
router.get('/employe-leads/:id', getEmployeeLeads);
router.put('/updateLeadStatus/:id', updateLeadStatus);


module.exports = router;