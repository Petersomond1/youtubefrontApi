// youtube_api\routes\videofetchRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videofetchController');
// const validateApiKey = require('../middleware/validateApiKey');

// Apply API key validation middleware to all routes
// router.use(validateApiKey);

// Get videos by search query
router.get('/', videoController.getAllVideos);
router.get('/search', videoController.searchVideos);

// Get video details by ID
router.get('/:videoId', videoController.getVideoDetails);

module.exports = router;