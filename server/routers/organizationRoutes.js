const express = require('express');
const router = express.Router();
const { addOrganization, deleteOrganization, updateOrganization,getAllOrganizations } = require('../controllers/OrgsnizationActions');


router.post('/addOrganization', addOrganization);

router.get("/getOrganization",getAllOrganizations);

router.delete('/deleteOrganization/:id', deleteOrganization);


router.put('/updateOrganization/:id', updateOrganization);

module.exports = router;
