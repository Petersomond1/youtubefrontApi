//youtube_api\routes\mediauploadRoutes.js
//Endpoints lineup:localhost:5173 => localhost:5000/api/media ......
const express                = require("express");
const multer                 = require("multer");
const mediauploadController  = require("../controllers/mediauploadController");
// import validateApiKey from '../middleware/validateApiKey';

const router = express.Router();



// Apply API key validation middleware to all routes
// router.use(validateApiKey);

// configure multer for multipart/form-data “file” field:
const upload = multer({ storage: multer.memoryStorage() }).single("file");

// 1) GET  /api/media/generate-upload-url?fileName=…&fileType=…
router.get(
  "/generate-upload-url",
  mediauploadController.generateUploadURL
);

// 2) POST /api/media/upload
//    multipart/form-data: { file: <binary>, metadata: "<JSON string>" }
router.post(
  "/upload",
  upload,
  mediauploadController.uploadToS3
);

module.exports = router;