const express = require('express');
const router = express.Router();
const { addOrganization, deleteOrganization, updateOrganization } = require('../controllers/OrgsnizationActions');


router.post('/addOrganization', addOrganization);


router.delete('/deleteOrganization', deleteOrganization);


router.put('/updateOrganization', updateOrganization);

module.exports = router;
