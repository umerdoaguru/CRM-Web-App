const express = require("express");
const upload = require('../config/multerConfig'); // Import multer configuration
const { register, login, editProfile } = require("../controllers/UserController");
const router = express.Router();

// Register and login routes
router.post("/register", register);
router.post("/login", login);

// Edit profile route with multer middleware for file uploads
router.put("/editProfile", upload.single('profile_picture'), editProfile);

module.exports = router;
