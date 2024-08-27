const multer = require('multer');

// Configure multer storage to use memory storage for handling file buffers
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
