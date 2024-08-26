const express = require("express");

const {  register, login,editProfile } = require("../controllers/UserController");
const router = express.Router();



router.post("/register",register);
router.post("/login",login );
router.put("/editProfile",editProfile);

module.exports = router;