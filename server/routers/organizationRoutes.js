const express = require('express');
const router = express.Router();
const { addOrganization, deleteOrganization, updateOrganization,getAllOrganizations,addEmployee,getAllEmployees,updateEmployee,deleteEmployee } = require('../controllers/OrgsnizationActions');


router.post('/addOrganization', addOrganization);

router.get("/getOrganization",getAllOrganizations);

router.delete('/deleteOrganization/:id', deleteOrganization);

router.get('/getAllEmployees',getAllEmployees)

router.put('/updateOrganization/:id', updateOrganization);

router.post("/addEmployee",addEmployee);

router.put('/updateEmployee/:id',updateEmployee);
router.delete("/deleteEmployee/:id",deleteEmployee);
module.exports = router;
