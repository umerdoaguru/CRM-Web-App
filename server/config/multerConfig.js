const multer = require('multer');

// Configure multer storage to use memory storage for handling file buffers
const storage = multer.memoryStorage();

// Configure multer with size limit
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB limit, adjust as needed
  }
});

module.exports = upload;
