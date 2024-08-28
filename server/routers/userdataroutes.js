const express = require("express");
const upload = require('../config/multerConfig'); // Import multer configuration
const { register, login, editProfile, getAllUsers ,deleteProfile} = require("../controllers/UserController");
const router = express.Router();

// Register and login routes
router.post("/register", register);
router.post("/login", login);

// Fetch all users
router.get("/getUser", getAllUsers);

// Edit profile with profile picture upload
router.post("/editProfile", upload.single('profile_picture'), editProfile);
router.delete('/deleteUser',deleteProfile);
// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = router;
