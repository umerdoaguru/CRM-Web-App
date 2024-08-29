const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload=require("../config/multerConfig")
const { addOrganization, deleteOrganization, updateOrganization,getAllOrganizations,addEmployee,getAllEmployees,updateEmployee,deleteEmployee } = require('../controllers/OrgsnizationActions');

router.post('/addOrganization', upload.fields([{ name: 'signature' }, { name: 'logo' }]), addOrganization);


router.get("/getOrganization",getAllOrganizations);

router.delete('/deleteOrganization/:id', deleteOrganization);

router.get('/getAllEmployees',getAllEmployees)

router.put('/updateOrganization/:id', upload.fields([{ name: 'signature' }, { name: 'logo' }]), updateOrganization);

router.post("/addEmployee",addEmployee);

router.put('/updateEmployee/:id',updateEmployee);
router.delete("/deleteEmployee/:id",deleteEmployee);
module.exports = router;
